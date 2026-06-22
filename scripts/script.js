// Automatic carousel rotation
document.addEventListener('DOMContentLoaded', function() {
    const carouselNames = new Set();
    document.querySelectorAll('.carousel__activator').forEach(input => {
        carouselNames.add(input.name);
    });

    // For each carousel, set up automatic rotation
    carouselNames.forEach(carouselName => {
        const inputs = document.querySelectorAll(`input[name="${carouselName}"]`);
        let currentIndex = 0;

        setInterval(() => {
            currentIndex = (currentIndex + 1) % inputs.length;
            inputs[currentIndex].checked = true;
        }, 10000);
    });
});
