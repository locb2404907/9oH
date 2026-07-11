function filterNews(category) {
    const articles = document.querySelectorAll(".news-card");
    articles.forEach(function(article){
        const artCategory = article.getAttribute("data-category");
        if(category === "all" || artCategory === category){
            article.style.display = "";
        }else{
            article.style.display = "none";
        }
    });
    document.querySelectorAll(".filter-buttons .btn").forEach(function(btn){
        btn.classList.remove("active");
    });
    if(window.event){
        window.event.target.classList.add("active");
    }
}
document.addEventListener("DOMContentLoaded",function(){
    document.querySelectorAll(".search-btn").forEach(function(btn){
        btn.addEventListener("click",function(e){
            e.stopPropagation();
            const img=this.closest(".img-container").querySelector("img");
            const keyword=img.alt || img.src;
            window.open(
                "https://www.google.com/search?q="+encodeURIComponent(keyword),
                "_blank"
            );
        });
    });
});