class Peer {
  constructor() {
    if (!this.peer) {
      this.peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              'stun:stun.l.google.com:19302',
              'stun:global.stun.twilio.com:3478',
            ],
          },
        ],
      });
    }
  }

  async getOffer() {
    try {
      if (this.peer) {
        let offer = await this.peer.createOffer();
        await this.peer.setLocalDescription(new RTCSessionDescription(offer));
        return offer;
      }
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  }

  async getAnswer(offer) {
    try {
      if (this.peer) {
        await this.peer.setRemoteDescription(offer);
        let answer = await this.peer.createAnswer();
        await this.peer.setLocalDescription(new RTCSessionDescription(answer));
        return answer;
      }
    } catch (error) {
      console.error('Error creating answer:', error);
    }
  }

  async acceptAnswer(ans) {
    try {
      if (this.peer) {
        await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
      }
    } catch (error) {
      console.error('Error accepting answer:', error);
    }
  }
}

export default new Peer();
