import React from 'react'
const fs = require('fs')
import { SitemapStream, streamToPromise } from 'sitemap'

export default async (req, res) => {
  try {
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
      cacheTime: 600000,
    });

    // List of events
    const data = await fetch(process.env.API_SERVER + 'events')
    const events = await data.json()

    // Create each URL row
    events.forEach(event => {
      smStream.write({
        url: `/event/${event.id}`,
        changefreq: 'daily',
        priority: 0.8
      })
    })

    // End sitemap stream
    smStream.end();

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString();

    // Change headers
    res.writeHead(200, {
      'Content-Type': 'application/xml'
    });

    // Display output to user
    res.end(sitemapOutput);
  } catch(e) {
    console.log(e)
    res.send(JSON.stringify(e))
  }

}
