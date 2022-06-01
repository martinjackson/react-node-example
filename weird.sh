
# This was a weird error 
npm run build:back-end
   cd server && npx babel-watch server.js 8081

       babel-watch 
              Watcher failure { Error: ENOSPC: no space left on device, watch 'server.js'

# and a wierd solution 
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

