/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /*This is our first test suite - a test suite just contains
    a related set of tests. This suite is all about the RSS
    feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         allFeeds variable has been defined and that it is not
         empty */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed in the allFeeds object and ensures it has a URL defined
        and that the URL is not empty */
        it('urls are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* A test that loops through each feed
         in the allFeeds object and ensures it has a name defined
         and that the name is not empty.
         */
        it('name is defined', function() {
            allFeeds.forEach(function(feedname) {
                expect(feedname.name).toBeDefined();
                expect(feedname.name.length).not.toBe(0);
            });
        });
    });

    /* A test that ensures the menu element is
    hidden by default*/
    describe('Menu Element', function() {
        it('menu element is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* A test that ensures the menu changes
        visibility when the menu icon is clicked.*/
        it('does the menu display when clicked', function() {
            $('a.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
        });

        it('does the menu hide when clicked', function() {
            $('a.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    /* A test that ensures when the loadFeed
    function is called and completes its work, there is at least
    a single .entry element within the .feed container.*/
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('there is at least a single entry in .feed container', function() {
            expect($('.feed .entry').children().length).not.toBe(0);
        });
    });

    /* A test that ensures when a new feed is loaded
    by the loadFeed function that the content actually changes.*/
    describe('New Feed Selection', function() {
        var initial;

        beforeEach(function(done) {
            loadFeed(0, function() {
                var initial = $('.feed').html();
                loadFeed(1, function() {
                    done();
                });
            });
        });

        it('content actually changes', function(done) {
            expect($('.feed').html()).not.toBe(initial);
            done();
        });
    });

}());
