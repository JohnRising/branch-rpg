import { RpgEvent, EventData, RpgPlayer } from "@rpgjs/server";
import { store } from "../../../web3/client/store";

@EventData({
  name: "execute",
  hitbox: {
    width: 32,
    height: 64,
  },
})
export class executeEvent extends RpgEvent {
  async onAction(player: RpgPlayer) {
    console.log(store.calls.length)
    const choice = await player.showChoices(
      "Howdy friend! Do you want to share your progress with the other players?",
      [
        { text: "Yes", value: true },
        { text: "Maybe in a bit", value: false },
      ]
    );
    if (choice?.value) {
      await player.showText("Wonderful!", {
        talkWith: this,
      });
      await player.showText("Sharing your tasks... Please check the console for more information.", {
        talkWith: this,
      });
      player.emit("executeTasks", {});
    }
    if (!choice?.value){
      await player.showText("No worries! Make sure you share before you leave, or your tasks will be lost.", {
        talkWith: this,
      });
    }
  }
}