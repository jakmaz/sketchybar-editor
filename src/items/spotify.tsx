import { SketchybarItemComponentProps } from '@/lib/item-interface';
import { ItemDefinition } from '@/lib/item-registry';
import { BaseItem } from './base-item';

function SpotifyMediaItem({ itemSettings }: SketchybarItemComponentProps) {
  return <BaseItem itemSettings={itemSettings} icon={"󰝚"} label={"Spotify Track – Artist"} />
}


const itemConfig =
  `SPOTIFY_EVENT="com.spotify.client.PlaybackStateChanged"
sketchybar --add event spotify_change $SPOTIFY_EVENT
sketchybar --set {itemName} icon=󰝚
sketchybar --set {itemName} label.max_chars=40
sketchybar --set {itemName} script="$PLUGIN_DIR/spotify.sh"
sketchybar --subscribe {itemName} spotify_change`

const pluginScript =
  `INFO=$(osascript -e '
  tell application "Spotify"
    if it is running and player state is not stopped then
      set trackName to name of current track
      set artistName to artist of current track
      return trackName & " – " & artistName
    else
      return ""
    end if
  end tell
')

if [ -z "$INFO" ]; then
  sketchybar --set "$NAME" drawing=off
else
  sketchybar --set "$NAME" label="$INFO" drawing=on
fi`

export const spotifyItemDefinition: ItemDefinition = {
  type: 'spotify',
  displayName: 'Spotify Media',
  description: 'Shows currently playing spotify media',
  authorGithubUsername: 'FelixKratz',
  tags: ['media', 'music'],
  component: SpotifyMediaItem,
  defaultIcon: '󰝚',
  requiresPlugin: true,
  generateItemConfig: (itemName) => itemConfig.replace(/{itemName}/g, itemName),
  pluginScript: pluginScript,
}

