// Saves options to chrome.storage
function save_options() {
  let slackToken = document.getElementById("slack_token").value;
  let slackChannel = document.getElementById("slack_channel").value;
  chrome.storage.sync.get({ "xebiaStorageKey": DEFAULT_XEBIA_STORAGE }).then((result) => {
    let xebiaState = result.xebiaStorageKey;
    xebiaState.slack.token = slackToken;
    xebiaState.slack.channel = slackChannel;
    chrome.storage.sync.set({ xebiaStorageKey: xebiaState }).then(() => {
      // Update status to let user know options were saved.
      let status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(function () {
        status.textContent = "";
      }, 750);
    });
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({ "xebiaStorageKey": DEFAULT_XEBIA_STORAGE }, function (result) {
    let xebiaState = result.xebiaStorageKey;
    document.getElementById("slack_token").value = xebiaState.slack.token;
    document.getElementById("slack_channel").value = xebiaState.slack.channel;
  });
}

document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
Id("save").addEventListener("click", save_options);