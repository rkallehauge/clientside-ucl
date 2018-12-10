// Once window object triggers "load" event, execute code block
window.addEventListener('load', function(){
    // Window has now loaded, and all elements are now in the DOM.


    // Login open toggle
    var login = document.getElementById('login');
    login.addEventListener('click', function(){
        var elem = document.getElementById('login-form');

        // Handle the visuals in CSS, much simpler
        elem.classList.toggle('display');
    }, false);

    // Mobile menu toggle
    var mobilemenu = document.getElementById('mobile-menu');
    mobilemenu.addEventListener('click', function(){
        var nav = document.getElementsByClassName('navigation')[0];

        // Handle the visuals in CSS, much simpler
        nav.classList.toggle('display');
    });
    function search(term){
        var url = "https://newsapi.org/v2/top-headlines?q=" + term + "&apiKey=" + apiKey;
        $.ajax({
            url: url,
            success: function(data){
                // If there are any sensational headlines about that term
                if(data.articles.length != 0){
                    $('#news-type').text("Headlines");
                    generateArticles(data);
                // else show everything about the term
                } else{
                    $('#news-type').text("All news");
                    var url = "https://newsapi.org/v2/everything?q=" + term + "&apiKey=" + apiKey;
                    $.ajax({
                        url: url,
                        success: function(data){
                            generateArticles(data);
                        }
                    })
                }
            }
        }); // AJAX
    }

    function generateArticles(data){
        $('#news-current').text(term); // Show current search term
        $('#news').empty(); // Fetus deletus.. I mean removes all children
        var limit = 5;
        if (data.articles.length < 5){
            limit = data.articles.length;
        }
        for(var i = 0; i < limit; i++){
            var article = data.articles[i];
            var html = "";
            // Article title
            html += "<article><h3>" + article.title + "</h3>";
            
            // Article image and link
            html += "<a href='" + article.url + "'><img src='" + article.urlToImage + "'></a></article>";
            $('#news').append(html);
        }
    }

    var apiKey = "c450562899294e4c890a67465718d0b9"; // newsapi api key, dont tell anyone 
    var hypeTerms = ['blockchain', 'trump', 'putin', 'korea', 'cnn']; // i am not very creative
    var term = hypeTerms[Math.floor(Math.random()*hypeTerms.length)]; // Default term to search for
    
    // Call search once when site loads 
    search(term);
 
    $('#news-current').text(term);
    $('#news-search').click(function(){
        term = $('#news-query').val(); // encodes into uri friendly format itself
        search(term);
    }); // Click

}, false);
