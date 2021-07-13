// const getImagenPromesa = () => new Promise(resolve => resolve('hay data'))
// getImagenPromesa().then(console.log);

const getImagen = async () => {

    try {
        const apiKey = 'DhirLNVz75BN64TMIZdfbxeOh0TsDsxe';
        const resp = await fetch(`http://api.giphy.com/v1/gifs/random?api_key=${apiKey}`);
        const { data } = await resp.json();
        const { url } = data.images.original;
        console.log(url)
        const img = document.createElement('img');
        img.src = url;
        document.body.append(img);
    } catch (error) {
        // Manejo del error
        console.error(error);
    }

}

getImagen();

