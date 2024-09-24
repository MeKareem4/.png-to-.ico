const pngFileInput = document.getElementById('png-file');
const convertBtn = document.getElementById('convert-btn');
const logsDiv = document.getElementById('logs');
const downloadLink = document.getElementById('download-link');

convertBtn.addEventListener('click', () => {
    const pngFile = pngFileInput.files[0];
    if (!pngFile) {
        alert('Please select a PNG file');
        return;
    }

    logsDiv.innerHTML = 'Converting PNG to ICO...';

    const reader = new FileReader();
    reader.onload = () => {
        const pngData = reader.result;
        const pngBuffer = Buffer.from(pngData, 'base64');

        const ico = require('png-to-ico');
        ico(pngBuffer).then(icoBuffer => {
            const icoBlob = new Blob([icoBuffer], { type: 'image/x-icon' });
            const icoUrl = URL.createObjectURL(icoBlob);

            logsDiv.innerHTML += '<br>Conversion complete!';
            downloadLink.href = icoUrl;
            downloadLink.download = 'output.ico';
            downloadLink.style.display = 'block';
        }).catch(error => {
            logsDiv.innerHTML += `<br>Error: ${error.message}`;
        });
    };
    reader.readAsDataURL(pngFile);
});
