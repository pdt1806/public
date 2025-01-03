# benny's public library

This is basically just an http file server that serves files from a directory. Except I made it public so that I can share files with everyone over the internet.

## Inspirations

- [public.tobycm.dev](https://public.tobycm.dev) ([tobycm](https://tobycm.dev) my goat)
- [Five Server](https://github.com/yandeu/five-server)
- [python's http.server](https://docs.python.org/3/library/http.server.html)

## For general users

### "public library" 📚

Who knows, maybe I will share some useful files here that you might find helpful/knowledgeable. I will try to organize the files into categories like "programming", "design", "music", etc.

### Files seem to load slowly 🐢

Files are served from my personal server using my home internet connection, and the upload speed is not that great. So if you are experiencing slow loading times, I apologize for that. The speed is also affected by many other factors like your internet connection, the server's location, etc.

## For developers

### Why made one when there are already many? 🤔

- Learning opportunity. Before this project, I already knew how to make a simple REST API using Express.js, but this time I wanted to use it to share files with everyone. And while working on this project, I learned a lot about how serving content over HTTP works (like, the way I think about it totally changed while building this project), and from that I modified the server to my liking.
- I have more control over the functionality and design of the server. I can add features that I want and remove features that I find unnecessary.

### Extra features 🎉

- ✅ Dark/Light mode.
- ✅ Server-side rendering (not really a feature, but I just wanted to mention it).

### How to set up the server ⚙️ (I mean you should build your own, but if you want to use mine, here's how)

- Clone the repository.
- Install the dependencies.
- Create a `public` folder in the root of the project.
- Run the server (`index.ts`).

And that's it! You can now access the server at `http://localhost:26124` and start adding files to the `public` folder.

> [!TIP]
> You can use [Syncthing](https://syncthing.net/) to sync the `public` folder on your server with a folder on your personal computer, which makes things easier to update (thanks Toby again 🙏).

## Contributions and feedback 📝

Contributions are welcome, but I don't think there is much to contribute to this project. Any suggestions or feedback is welcome, just contact [me@bennynguyen.dev](mailto:me@bennynguyen.dev).
