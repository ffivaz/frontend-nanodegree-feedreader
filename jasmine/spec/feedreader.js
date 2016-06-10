$(function() {

    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test ensures that URLs in the allFeeds object are defined and not empty. */
        it('URL are defined and not empty', function () {
            allFeeds.forEach(function (obj) {
                expect(obj.url).toBeDefined();
                expect(obj.url).not.toBe('');
            });
        });


        /* This test ensures that names in the allFeeds object are defined and not empty. */
        it('Names are defined and not empty', function () {
            allFeeds.forEach(function (obj) {
                expect(obj.name).toBeDefined();
                expect(obj.name).not.toBe('');
            });
        });

    });

    describe('The menu', function () {

        /* This test ensures that the menu is hidden by default which is done by having the class menu-hidden in the
         * body DOM element
         */
        it('should be hidden by default', function () {
            bodyClasses = $(document.body).attr('class');
            expect(bodyClasses).toContain('menu-hidden');
        });

        /* This test ensures that the class changes when the menu button is clicked
        * Note that the bodyClasses variable has to be refreshed after the click and before checking
        * that the body element has (or has not) the menu-hidden class.
        */
        it('should become visible or hide when the button is clicked', function () {
            menuIcon = $('.menu-icon-link');

            menuIcon.click();
            bodyClasses = $(document.body).attr('class');
            expect(bodyClasses).not.toContain('menu-hidden');

            menuIcon.click();
            bodyClasses = $(document.body).attr('class'); // and again...
            expect(bodyClasses).toContain('menu-hidden');
        });

    });


    describe('Initial Entries', function () {

        /* This test ensures that tje loadFeed() function is is called and completes its work
         * It tests if there is at least an .entry element. The call is asynchronous and the test
         * waits for the function to complete before checking the result.
         */
        beforeEach(function (done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('there is at least one entry in the feed', function (done) {
            nEntries = $('.entry').length;
            expect(nEntries).toBeGreaterThan(0);
            done();
        });

    });

    describe('New Feed Selection', function () {

        /* This test ensures that the content changes when the another feed is loaded. */
        var content,
            newContent;

        beforeEach(function (done) {
            loadFeed(0, function() {
                content = $('.entry').text();
                done();
            });
            loadFeed(1, function () {
                newContent = $('.entry').text();
                done();
            })
        });

        it('there is actually new content when new data is loaded', function (done) {
            expect(content).not.toBe(newContent);
            done();
        });

    });
}());
