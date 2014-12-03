# [`L e a d e r b o a r d`](https://leaderboard-social.firebaseapp.com/)

Rank facebook pages by number of likes in real-time.

### Facebook

The app uses the Facebook Javascript SDK. Once authenticated, it uses the search endpoint and get object endpoint for [page nodes](https://developers.facebook.com/docs/graph-api/reference/v2.2/page/). 

The pages are polled at random intervals independently to make the interface more exciting. With a leaderboard full of popular pages, you see somewhat frequent changes in number of likes. 

### Firebase

The app uses the **[firebase/backbonefire](https://github.com/firebase/backbonefire)** bindings. Firebase and Backbone pair nicely as both are driven by events. The library wasn't maintained for a while, so some of the interfacing code is a bit awkward, like subclassing to create an instance. 

In order to ensure security of pages (so I can't set Drake to 20 likes on your leaderboard), every user's data is under a $uid node. This makes security a non-issue, but means lots of facebook page data and query effort could potentially be duplicated. Fantastic trade, since I can't afford more than ten concurrent user sessions. 

### Backbone

The app uses Backbone, an event-driven mvc javascript framework. Instead of using routes, it behaves more like a desktop application by storing state in localstorage and using a state event emitter. 

It's a very small site, so it uses a souped up View subclass instead of a more intense view hierarchy library. Using attr selectors the templates use an angular-inspired declarative event syntax. 

### Gulp

The Gulp build system concatenates scripts which eliminates the need for loading async modules in favor of dependency injection. It also precompiles handlebars templates. To avoid premature optimization, scripts aren't minified. 

Gulp watches for changes and writes to the `build` directory, which is ignored by git. Firebase uses that directory when uploading so the whole project doesn't need to get synced, just the user-facing static site. 

### Conclusion

Hopefully you find the concept fun and the codebase terse. You can look at the git commits to see amount of time spent. I never feel like it's a lot, but then again hours add up.

Feel free to contribute. I have no specific plans for it. MIT License. 
