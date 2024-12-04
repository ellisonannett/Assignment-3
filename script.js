window.onload = function () {
    const images = [
        document.getElementById('sliding-image-1'), // Duck Blue (Line 1)
        document.getElementById('sliding-image-2'), // Duck Green (Line 1)
        document.getElementById('sliding-image-3'), // Duck Red (Line 1)
        document.getElementById('sliding-image-4'), // Duck Yellow (Line 1)
        document.getElementById('sliding-image-5'), // Duck Purple (Line 1)
        document.getElementById('sliding-image-6'), // Duck Blue (Line 2)
        document.getElementById('sliding-image-7'), // Duck Green (Line 2)
        document.getElementById('sliding-image-8'), // Duck Red (Line 2)
        document.getElementById('sliding-image-9'), // Duck Yellow (Line 2)
        document.getElementById('sliding-image-10') // Duck Purple (Line 2)
    ];

    // Store the visibility state of the duck-blue images
    let hiddenImages = {
        1: false, // Duck Blue (Line 1)
        6: false  // Duck Blue (Line 2)
    };

    // Add click event listener to the duck-blue images
    images[1].addEventListener('click', function () {
        images[1].style.display = 'none'; // Hide the duck-blue image when clicked
        hiddenImages[1] = true; // Mark the image as hidden
    });

    images[6].addEventListener('click', function () {
        images[6].style.display = 'none'; // Hide the duck-blue image when clicked
        hiddenImages[6] = true; // Mark the image as hidden
    });

    // Resize images based on viewport and adjust vertical position
    function resizeImages() {
        const canvasWidth = window.innerWidth;
        const canvasHeight = window.innerHeight;

        images.forEach((image, index) => {
            // Set image size as 10% of canvas width, maintaining aspect ratio
            image.style.width = `${canvasWidth * 0.1}px`; // 10% of canvas width
            image.style.height = 'auto'; // Maintain aspect ratio

            // Position each image line vertically
            if (index < 5) {
                // First line of ducks (Line 1)
                image.style.top = `${canvasHeight * 0.32}px`; // 25% of the canvas height
            } else {
                // Second line of ducks (Line 2)
                image.style.top = `${canvasHeight * 0.65}px`; // 60% of the canvas height
            }
        });
    }

    // Define different speeds for each image
    const speeds = [2.5, 3.5, 4, 1, 5, 2.5, 3.5, 1.5, 4.5, 3]; // Different speed for each image

    // Animation function to slide the images from right to left
    function slideImages() {
        let positions = images.map((image, index) => window.innerWidth + (index * image.offsetWidth));

        // Move all the images
        function move() {
            positions = positions.map((pos, index) => pos - speeds[index]); // Move images at different speeds

            images.forEach((image, index) => {
                image.style.left = `${positions[index]}px`;
            });

            // Reset position for all images if they go off-screen
            positions = positions.map((pos, index) => {
                const imageWidth = images[index].offsetWidth;
                if (pos + imageWidth < 0) {
                    // Reset position to the right side, and check if the image is hidden
                    if (hiddenImages[index]) {
                        images[index].style.display = 'block'; // Show the hidden duck-blue image
                        hiddenImages[index] = false; // Reset the hidden state
                    }
                    return window.innerWidth + (index * imageWidth); // Reset to the right side
                }
                return pos;
            });

            requestAnimationFrame(move); // Keep moving the images
        }

        move(); // Start the animation
    }

    // Call resizeImages on load and window resize
    resizeImages();
    window.addEventListener('resize', resizeImages);

    slideImages(); // Call the function to start the animation
};
