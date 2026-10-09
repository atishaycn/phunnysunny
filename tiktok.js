(function () {
  "use strict";

  // Elements
  var tkConnect = document.getElementById("tkConnect");
  var tkConnectPrimary = document.getElementById("tkConnectPrimary");
  var tkAccountName = document.getElementById("tkAccountName");
  var tkAccountDetail = document.getElementById("tkAccountDetail");
  var tkAvatar = document.getElementById("tkAvatar");
  var tkUploadArea = document.getElementById("tkUploadArea");
  var tkFileInput = document.getElementById("tkFileInput");
  var tkUseSample = document.getElementById("tkUseSample");
  var tkCreateForm = document.getElementById("tkCreateForm");
  var tkPreview = document.getElementById("tkPreview");
  var tkPost = document.getElementById("tkPost");
  var tkBackEdit = document.getElementById("tkBackEdit");
  var tkCreateAnother = document.getElementById("tkCreateAnother");
  var tkApiOutput = document.getElementById("tkApiOutput");
  var tkPreviewAccount = document.getElementById("tkPreviewAccount");
  var tkPreviewCaption = document.getElementById("tkPreviewCaption");

  var views = {
    connect: document.getElementById("tkViewConnect"),
    create: document.getElementById("tkViewCreate"),
    preview: document.getElementById("tkViewPreview"),
    posted: document.getElementById("tkViewPosted")
  };

  var steps = [
    document.getElementById("tkStep1"),
    document.getElementById("tkStep2"),
    document.getElementById("tkStep3"),
    document.getElementById("tkStep4")
  ];

  var currentStep = 0;

  function showView(name) {
    Object.keys(views).forEach(function (key) {
      views[key].classList.toggle("tk-hidden", key !== name);
    });
  }

  function setStep(index) {
    currentStep = index;
    steps.forEach(function (step, i) {
      if (!step) return;
      step.classList.toggle("tk-step-active", i <= index);
      step.classList.toggle("tk-step-done", i < index);
    });
  }

  function connectDemo() {
    setStep(0);
    tkAccountName.textContent = "@creator_demo";
    tkAccountDetail.textContent = "Connected · sandbox session";
    tkAvatar.classList.add("tk-avatar-connected");
    tkConnect.classList.add("tk-connect-connected");
    tkConnect.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Connected';
    tkConnectPrimary.disabled = true;
    tkConnectPrimary.textContent = "Connected";
    showView("create");
    setStep(1);
  }

  function goToPreview() {
    var caption = document.getElementById("tkCaption").value || "Demo caption";
    var title = document.getElementById("tkTitle").value || "My slideshow";
    var hashtags = document.getElementById("tkHashtags").value || "";
    var aigc = document.getElementById("tkAigc").checked;

    tkPreviewAccount.textContent = tkAccountName.textContent;
    tkPreviewCaption.textContent = caption + (hashtags ? " " + hashtags : "");

    showView("preview");
    setStep(2);
  }

  function doPost() {
    var caption = document.getElementById("tkCaption").value || "Demo caption";
    var title = document.getElementById("tkTitle").value || "My slideshow";
    var hashtags = document.getElementById("tkHashtags").value || "";
    var aigc = document.getElementById("tkAigc").checked;

    showView("posted");
    setStep(3);

    tkApiOutput.textContent = JSON.stringify({
      endpoint: "https://open.tiktokapis.com/v2/post/publish/video/init/",
      scope: "video.publish",
      post_info: {
        title: title,
        privacy_level: "SELF_ONLY",
        is_aigc: aigc
      },
      source_info: {
        source: "FILE_UPLOAD",
        video_file: "slideshow_output.mp4"
      },
      result: "Sandbox only. Not sent to TikTok."
    }, null, 2);
  }

  function resetFlow() {
    showView("create");
    setStep(1);
    document.getElementById("tkTitle").value = "";
    document.getElementById("tkCaption").value = "";
    document.getElementById("tkHashtags").value = "";
    tkCreateForm.classList.add("tk-hidden");
    tkUploadArea.classList.remove("tk-hidden");
  }

  // Sidebar connect button
  tkConnect?.addEventListener("click", function () {
    if (tkAccountName.textContent === "Not connected") {
      connectDemo();
    }
  });

  // Primary connect button
  tkConnectPrimary?.addEventListener("click", connectDemo);

  // Upload area click triggers file input
  tkUploadArea?.addEventListener("click", function () {
    tkFileInput.click();
  });

  // File input change shows form
  tkFileInput?.addEventListener("change", function () {
    if (this.files.length > 0) {
      tkUploadArea.classList.add("tk-hidden");
      tkCreateForm.classList.remove("tk-hidden");
    }
  });

  // Use sample slideshow button
  tkUseSample?.addEventListener("click", function () {
    document.getElementById("tkTitle").value = "Sample creator slideshow";
    document.getElementById("tkCaption").value = "A short slideshow created and approved by the connected creator.";
    document.getElementById("tkHashtags").value = "#slideshow #creator";
    tkUploadArea.classList.add("tk-hidden");
    tkCreateForm.classList.remove("tk-hidden");
  });

  // Preview button
  tkPreview?.addEventListener("click", goToPreview);

  // Post button
  tkPost?.addEventListener("click", doPost);

  // Back to edit
  tkBackEdit?.addEventListener("click", function () {
    showView("create");
    setStep(1);
  });

  // Create another
  tkCreateAnother?.addEventListener("click", resetFlow);
})();
