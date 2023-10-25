const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

const Search = document.getElementById("search");
const Search_btn = document.getElementById("search-btn");
const img_box = document.getElementById("image-box");
const showMore = document.getElementById("show-more");

let search_data = "";

Search_btn.addEventListener('click', function(event){
    img_box.textContent='';
    searchForImages();
})

let page = 1;

const searchForImages = async () => {
    search_data = Search.value;
    console.log(search_data);

    const res = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${search_data}&client_id=${accessKey}`);
    const data = await res.json();
    const img_data = data.results;
    console.log(img_data);
    
    img_data.forEach(data => {
        console.log(data.urls.full);
        const cards = document.createElement('div');
        cards.classList = `card`;

        const descurl = document.createElement('a');
        descurl.href = data.links.html;
        descurl.textContent = data.alt_description;

        const imgurl = document.createElement('img');
        imgurl.src = data.urls.small;

        const downloadlink = document.createElement('a');
        downloadlink.download = "downloaded.jpg";
        downloadlink.textContent = "View Image";
        downloadlink.id = "download";

        cards.appendChild(imgurl);
        cards.appendChild(descurl);
        cards.appendChild(downloadlink);
        img_box.appendChild(cards);

        downloadlink.addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = imgurl.src;
            link.download = 'downloaded_image.jpg';
            link.target = "_blank"; 
            link.click();
        });
    });
    page++;
    if(page > 1){
        showMore.style.display = 'block';
    }
}
showMore.addEventListener('click',function(){
    searchForImages();
})