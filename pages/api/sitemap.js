import React from 'react'
import { SitemapStream, streamToPromise } from 'sitemap/dist'

export default async (req, res) => {
  try {
    console.log(req.headers.host);
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
      cacheTime: 600000,
    });

    // List of events
    var data = await fetch(process.env.API_SERVER + 'events')
    const events = await data.json()

    data = await fetch(process.env.API_SERVER + 'activities')
    const projects = await data.json()

    // Create each URL row
    events.forEach(event => {
      smStream.write({
        url: `/event/${event.id}`,
        changefreq: 'weekly',
        priority: 0.8
      })
    })

    projects.forEach(project => {
      smStream.write({
        url: `/projects/${project.slug}`,
        changefreq: 'weekly',
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
