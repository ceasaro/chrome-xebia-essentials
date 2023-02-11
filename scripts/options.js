// Saves options to chrome.storage
function save_options() {
  let slackToken = document.getElementById("slack_token").value;
  let slackChannel = document.getElementById("slack_channel").value;
  let resetCardsChecked = document.getElementById("reset_seen_cards").checked;
  chrome.storage.sync.get({ "xebiaStorageKey": DEFAULT_XEBIA_STORAGE }).then((result) => {
    let xebiaState = result.xebiaStorageKey;
    xebiaState.slack.token = slackToken;
    xebiaState.slack.channel = slackChannel;
    if (resetCardsChecked) {
      resetCards();
    }
    chrome.storage.sync.set({ xebiaStorageKey: xebiaState }).then(() => {
      // Update status to let user know options were saved.
      let status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(function () {
        status.textContent = "";
      }, 750);
      set_seen_cards(xebiaState);
    });
  });
}

// Restores select box and checkbox state using the preferences
function set_seen_cards(xebiaState) {
  let card_count = xebia_essential.cards.length;
  let unseen_card_count = xebiaState.unseenCards.length;
  document.getElementById("amount_of_cards_seen").textContent = `(${card_count - unseen_card_count} / ${card_count} seen)`;
}

// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({ "xebiaStorageKey": DEFAULT_XEBIA_STORAGE }, function (result) {
    let xebiaState = result.xebiaStorageKey;
    document.getElementById("slack_token").value = xebiaState.slack.token;
    document.getElementById("slack_channel").value = xebiaState.slack.channel;
    set_seen_cards(xebiaState);
  });
}

document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
document.getElementById("xebia_essentials_website_link").href = xebia_essential.domain;
