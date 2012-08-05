//returns the file view
define(function(FileModel){ 
    return Backbone.View.extend({

        tagName: "div",

        initialize: function(){
        },

        template: _.template($('#music-template').html()),

        render: function(){
            this.$el.html(this.template(this.options));
            this.fileInput = this.$el.find('#file-input')[0];
            return this.$el;
        },

        //might want to change this to get rid of jquery completely
        events: {
        },

    })
});
