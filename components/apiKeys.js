// apiKeys.js

export const weatherApiKey = '846eafb6759b6afae2d952175294a7bf';
export const weatherweekApiKey = '454041ea7e6b537bbedaee0c9bbc0592';
export const newsApiKey = 'acc8d208b9284ffab754932b0176b560';

// The reason for creating a component to store all api keys was 
// to reduce the risk for the native react to complain for having 
// two same api keys in the same file. This was for just in case if
// it would appear that I hade to use two same api keys in the same 
// file to make a certain function work togheter. The other reason 
// was also just to store all api keys to make it easier to find
// them if needed to change a api key.
