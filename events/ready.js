const gradient = require("gradient-string");
module.exports = {
  name: 'ready',
  async execute(client)
  {
    console.clear();
    console.log(gradient('#ffdd00', '#d35400')(`Bot connected with ${client.user.username}` +
        ""));

    await client.user.setActivity("Downing Poggit Server", { type: "COMPETING"});
    await client.user.setStatus('idle');
  }
};
