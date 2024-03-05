module.exports = {
  apps: [
    {
      script: "server.js", // Change the script to your server file (server.js)
      watch: ".", // Watching the current directory
      name: "backend",
      instances: "1", //max // Define the number of instances
      exec_mode: "cluster", // Run in cluster mode
      env: {
        PORT: 8080, // Set your preferred port here
        NODE_ENV: "production",
      },
    },
  ],

  deploy: {
    production: {
      user: "SSH_USERNAME",
      host: "SSH_HOSTMACHINE",
      ref: "origin/master",
      repo: "GIT_REPOSITORY",
      path: "DESTINATION_PATH",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
};
