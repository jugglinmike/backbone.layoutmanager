var Gallery = Backbone.Model.extend({
    defaults: {
        title: 'Layout Title'
    }
});
var Albums = Backbone.Collection.extend();


// Album item view
var AlbumItemView = Backbone.Layout.extend({
    tagName: 'li',
    className: 'album',
    template: '#gallery_item_view',
    serialize: function () {
        return this.model.toJSON();
    }
});

var albums_collection = new Albums();
var AlbumsView = Backbone.Layout.extend({
    el: false,
    template: "#albums_view",
    initialize: function () {
        console.log('AlbumsView.initialize');
        this.listenTo(window.albums_collection, 'add', this.addOne);
        this.listenTo(window.albums_collection, 'reset', this.addAll);
    },
    addOne: function (album) {
        // Here is the problem !
        console.log('AlbumsView.addOne');
        this.insertView('.album_list', new AlbumItemView({
            model: album
        })).render();
    },
    addAll: function () {
        console.log('AlbumsView.addAll');
        window.albums_collection.each(this.addOne, this);
    }
});

var MainLayout = Backbone.Layout.extend({
    template: "#gallery_layout",
    el: '.container',
    initialize: function () {
        this.listenTo(this.model, 'change', this.updateData);
    },
    serialize: function () {
        return this.model.toJSON();
    },
    updateData: function () {
        console.log('GalleryLayout.updateData');
        this.render();
        // When this is commented, the albums_view is still inserted multiple times
        // but no album item is inserted
        window.albums_collection.reset(albums_data);
    }
});

var gallery_model = new Gallery();
var mainLayout = new MainLayout({
    model: window.gallery_model,
    views: {
        '.gallery': new AlbumsView()
    }
});

var albums_data = [{
    "thumbnail_src": "http://lorempixel.com/20/20/",
    "title": "title 1"
  }, {
    "thumbnail_src": "http://lorempixel.com/20/20/",
    "title": "title 2"
  }, {
    "thumbnail_src": "http://lorempixel.com/20/20/",
    "title": "title 3"
  }];

mainLayout.render();

albums_collection.reset(albums_data);

setTimeout(function() {
  console.log("---------------");
  gallery_model.set('title', 'new title');
}, 1000);
