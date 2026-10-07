(function () {
  const connectButton = document.querySelector("#connectTikTok");
  const publishButton = document.querySelector("#publishTikTok");
  const connectionStatus = document.querySelector("#connectionStatus");
  const connectedUser = document.querySelector("#connectedUser");
  const accountDetail = document.querySelector("#accountDetail");
  const apiOutput = document.querySelector("#apiOutput");
  const steps = Array.from(document.querySelectorAll(".demo-step"));

  const setStep = (index) => {
    steps.forEach((step, stepIndex) => {
      step.classList.toggle("is-active", stepIndex <= index);
    });
  };

  connectButton?.addEventListener("click", () => {
    setStep(2);
    connectionStatus.textContent = "Connected in sandbox";
    connectedUser.textContent = "@phunnysunny_demo";
    accountDetail.textContent = "Authorized scopes: user.info.basic, video.publish";
    publishButton.disabled = false;
    apiOutput.textContent = [
      "OAuth callback received.",
      "Access token stored for this sandbox session.",
      "Ready to publish user-selected video."
    ].join("\n");
  });

  publishButton?.addEventListener("click", () => {
    setStep(3);
    publishButton.textContent = "Publish request sent";
    publishButton.disabled = true;
    apiOutput.textContent = JSON.stringify({
      endpoint: "https://open.tiktokapis.com/v2/post/publish/video/init/",
      scope: "video.publish",
      post_info: {
        title: "Discipline is overrated. Systems win because they still work when you are tired.",
        privacy_level: "SELF_ONLY",
        is_aigc: true
      },
      source_info: {
        source: "FILE_UPLOAD",
        video_file: "final_with_silent_audio.mp4"
      },
      result: "Sandbox publish request prepared"
    }, null, 2);
  });
}());
