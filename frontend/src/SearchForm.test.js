import React from 'react';

//test to check if the call to the express server works
test('the fetch fails with an error', () => {
  fetch('/search', {
    method: "POST",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify({
      media: 'this.state.media',
      searchFor:' this.state.searchFor'
    })
  })
    .catch(e => expect(e).not.toBe('error'));
  });
