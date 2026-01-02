/**
 * Official Transport for London (TfL) line colours
 * Maps line names (as they appear in the API) to their official hex colour codes
 */
export const lineToColour = new Map<string, string>([
  // London Underground lines
  ["bakerloo", "#B36305"], // Official Bakerloo brown
  ["central", "#DC241F"], // Official Central red
  ["circle", "#FFD320"], // Official Circle yellow
  ["district", "#00782A"], // Official District green
  ["hammersmith-city", "#F3A9BB"], // Official Hammersmith & City pink
  ["jubilee", "#A0A5A9"], // Official Jubilee grey
  ["metropolitan", "#9B0056"], // Official Metropolitan magenta
  ["northern", "#000000"], // Official Northern black
  ["piccadilly", "#003688"], // Official Piccadilly blue
  ["victoria", "#0098D4"], // Official Victoria light blue
  ["waterloo-city", "#95CDBA"], // Official Waterloo & City turquoise

  // Other TfL services
  ["dlr", "#00AFAD"], // Docklands Light Railway turquoise
  ["elizabeth", "#6950A1"], // Elizabeth line purple

  // London Overground named lines
  ["lioness", "#EE7C0E"], // Lioness line orange
  ["mildmay", "#00A4A7"], // Mildmay line blue
  ["suffragette", "#9CD23D"], // Suffragette line green
  ["weaver", "#E87722"], // Weaver line orange
  ["windrush", "#D22630"], // Windrush line red
  ["liberty", "#A0A5A9"], // Liberty line grey
]);
