/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* The 'RSS Feeds' test suite ensures that:
     * (a) the allFeeds variable has been defined and that it is not empty.
     * (b) each feed has a URL defined and the URL is not empty.
     * (c) each feed has a name defined and the name is not empty.
    */
    describe('RSS Feeds', function () {
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('each feed has a URL defined and is not empty', function () {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });

        it('each feed has a name defined and is not empty', function () {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });
    });

    /* 'The menu' test suite ensures that:
     * (1) the menu elemen is hidden by default.
     * (2) the menu changes/toggles visibility when the menu icon is clicked.
     */
    describe('The menu', function () {
        const menu = document.querySelector('body');
        const icon = document.querySelector('.menu-icon-link');

        it('is hidden by default', function () {
            expect(menu.classList.contains('menu-hidden')).toBe(true);
        });

        it('displays on click and hides when clicked again', function () {
            icon.click();
            expect(menu.classList.contains('menu-hidden')).toBe(false);
            icon.click();
            expect(menu.classList.contains('menu-hidden')).toBe(true);
        });
    });


    /* The 'Initial Entries' test suite ensures that:
     * when the loadFeed function is called and completes its work, 
     * there is at least a single .entry element within the .feed container.
     */
    describe('Initial Entries', function () {
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('has at least one entry on load', function (done) {
            const entry = document.querySelectorAll('.feed .entry');
            expect(entry.length).toBeGreaterThan(0);
            done();
        });
    });

    /* The 'New Feed Selection' test suite ensures that 
     * when a new feed is loaded by the loadFeed function 
     * the content actually changes. 
     */
    describe('New Feed Selection', function () {
        let prevFeed, newFeed;
        beforeEach(function (done) {
            loadFeed(0, function () {
                prevFeed = document.querySelector('.feed').innerHTML;
                loadFeed(2, done);
            });
        });

        it('changes content', function (done) {
            newFeed = document.querySelector('.feed').innerHTML;
            expect(prevFeed).not.toBe(newFeed);
            done();
        });
    });
}());
