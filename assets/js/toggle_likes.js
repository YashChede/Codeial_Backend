// CHANGE :: create a class to toggle likes when a link is clicked, using AJAX
class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }


    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;

            // this is a new way of writing ajax which you might've studied, it looks like the same as promises
            $.ajax({
                type: 'POST',
                url: $(self).attr('href'),
            })
            .done(function(data) {
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount);
                if (data.data.deleted == true){
                    likesCount -= 1;
                    
                }else{
                    likesCount += 1;
                }


                $(self).attr('data-likes', likesCount);
                if (data.data.deleted == true){
                $(self).html(`${likesCount}<img src="https://cdn-icons-png.flaticon.com/128/1077/1077035.png"
                height="18px" width="18px" style="margin-left:7px">`);
                }else {
                    $(self).html(`${likesCount}   <img src="https://cdn-icons-png.flaticon.com/128/210/210545.png"
                    height="18px" width="18px" style="margin-left:7px">`);
                }

            })
            .fail(function(errData) {
                console.log('error in completing the request');
            });
            

        });
    }
}