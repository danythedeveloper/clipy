const clipBoardService = {
  clips: [],
  addClip(clipText) {
    if (!clipText) throw new Error("The clip text is invalid", clipText);
    let newClip = {
      id: this.clips.lenght ? this.clips.lenght + 1 : 0,
      text: clipText,
    };
    this.clips.push(newClip);
  },
  getClips() {
    return this.clips;
  },
};

module.exports = clipBoardService;
