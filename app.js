document.addEventListener('DOMContentLoaded', function () {
    let isScrolling = false;
    let velocity = 0;
    let scrollTarget = 0;
    let animationFrameId = null;


    const nxt = document.querySelector('.next');
    const prv = document.querySelector('.prev');
    const container = document.querySelector('.card-container');
    

    container.scrollLeft = 300;



    // Momentum scroll function
    function momentumScroll() {
        if (!isScrolling && Math.abs(velocity) < 0.1) {
            cancelAnimationFrame(animationFrameId); // Stop the animation when velocity is low
            return;
        }

        container.scrollLeft += velocity; // Move by velocity
        velocity *= 0.95; // Decrease velocity to create friction-like effect
        isScrolling = false; // Only allow new scrolls after momentum ends

        checkIfInBox();

        animationFrameId = requestAnimationFrame(momentumScroll); // Continue the animation loop
    }



    var invisibleBox = {
        left: window.innerWidth / 2 - 140,  // Start 150px left from the center of the screen
        right: window.innerWidth / 2 + 140 // End 150px right from the center
    };

    container.addEventListener('scroll', checkIfInBox);

    function checkIfInBox() {
        var audioPlayer = document.getElementById('audioPlayer');
        var cards = document.querySelectorAll('.card');  // All the cards or elements you want to check
        cards.forEach(function (card) {
            var rect = card.getBoundingClientRect();

            // Check if the card intersects with the invisible box
            if (rect.left >= invisibleBox.left && rect.right <= invisibleBox.right) {
                card.classList.add('active');

                velocity = 0;  // Stop scrolling once card is active
                isScrolling = false;

                // Update the song based on the active card
                const songSrc = card.getAttribute('data-song');
                if (songSrc) {
                    audioPlayer.querySelector('source').src = songSrc;
                    audioPlayer.load(); // Reload audio for the new song
                    
                    
                    audioPlayer.play().then(() => {
                        var icon = document.querySelector('.play');
                        icon.src = icon2;
                        icon.style.marginLeft = '16px';
                        console.log('Playing: ', songSrc);  // Debug: Log when playback starts
                    }).catch(error => {
                        console.error('Error playing song: ', error);  // Debug: Log playback errors
                    });
                }
            }
                 else {
                card.classList.remove('active');
            }
        });
    }

    nxt.addEventListener('click', (event) =>{
        event.preventDefault();
        scrollTarget += 200;
        velocity += 30;

        if (!isScrolling ) {
            momentumScroll(); // Start the momentum scroll if it's not already running
            checkIfInBox();
            isScrolling = true;
        }

        var icon = document.querySelector('.play');
        icon.src = icon2;
        icon.style.marginLeft = '16px';
        
    })
    

    prv.addEventListener('click', (event) =>{
        event.preventDefault();

        scrollTarget += -200;
        velocity += -30;

        if (!isScrolling ) {
            momentumScroll(); // Start the momentum scroll if it's not already running
            checkIfInBox();
            isScrolling = true;
        }

        var icon = document.querySelector('.play');
        icon.src = icon2;
        icon.style.marginLeft = '16px';
    })



    container.addEventListener('wheel', (event) => {
        event.preventDefault();

        // Change in scroll target
        const delta = event.deltaY;

        // Set the target scroll position
        scrollTarget += delta;

        // Increase velocity when wheel is used
        velocity += delta * 0.3; // Change this multiplier for faster/slower momentum start

        // Ensure that momentum scrolling starts and doesn't stop abruptly
        if (!isScrolling ) {
            momentumScroll(); // Start the momentum scroll if it's not already running
            checkIfInBox();
            isScrolling = true;
        }
    });

    // Auto play funtion and loop

    var loop = document.getElementById('loop');

    audioPlayer.addEventListener('ended', function() {
       if(loop.classList.contains('active')){
        audioPlayer.currentTime = 0;
        audioPlayer.play();
       }else{
        scrollTarget += 200;
        velocity += 30;

        if (!isScrolling ) {
            momentumScroll(); // Start the momentum scroll if it's not already running
            checkIfInBox();
            isScrolling = true;
        }
       }
    });

    const progress = document.getElementById('progress');

    // Update the progress bar as the song plays
    audioPlayer.addEventListener('timeupdate', function () {
        progress.value = audioPlayer.currentTime;
    });

    // When the song metadata is loaded (duration, etc.)
    audioPlayer.addEventListener('loadedmetadata', function () {
        progress.max = audioPlayer.duration;
    });

    // When the user changes the progress bar manually
    progress.addEventListener('input', function () {
        audioPlayer.currentTime = progress.value;
    });

    // Play/pause control (e.g., external play/pause button if any)
    var icon = document.querySelector('.play');
    const icon1 = 'assets/play.png';
    const icon2 = 'assets/pause.png';

    icon.addEventListener('click', function () {
        if (audioPlayer.paused) {
            audioPlayer.play();
            icon.src = icon2;
            this.style.marginLeft = '16px';
        } 
        else {
            audioPlayer.pause();
            icon.src = icon1;
            this.style.marginLeft = '22px';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = document.getElementById('audioPlayer');
    const currentTimeDisplay = document.getElementById('current-time');
    const durationDisplay = document.getElementById('duration');

    // Update time displays
    audioPlayer.addEventListener('timeupdate', function () {
        currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    });

    audioPlayer.addEventListener('loadedmetadata', function () {
        durationDisplay.textContent = formatTime(audioPlayer.duration);
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
});

/*document.addEventListener('DOMContentLoaded', function(){
    const icons = doncument.querySelectorAll('.cls-1');
    
    icons.forEach( function(icon) {
        icon.classList.toggle('active');
    });
});*/

document.addEventListener('DOMContentLoaded', function(){
    const sound = document.getElementById('sound');
    const volume = document.getElementById('volume');

    sound.addEventListener('click', ()=>{
        volume.classList.toggle('active');
    });
});

document.addEventListener('DOMContentLoaded', function(){
    const loop = document.getElementById('loop');

    loop.addEventListener('click', ()=>{
        loop.classList.toggle('active');
    });
});

document.addEventListener('click', (event) =>{
    var sound = document.getElementById('sound');
    var volume = document.getElementById('volume');

    if(!sound.contains(event.target) && !volume.contains(event.target)){
        volume.classList.remove('active');
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = document.getElementById('audioPlayer');
    const volumeControl = document.getElementById('volume');

    // Set initial values
    volumeControl.value = audioPlayer.volume;

    // Update volume
    volumeControl.addEventListener('input', function () {
        audioPlayer.volume = volumeControl.value;
    });
});

