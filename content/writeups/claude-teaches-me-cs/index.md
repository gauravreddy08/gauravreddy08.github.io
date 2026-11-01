---
title: "i use claude code to teach me cs"
date: "2026-10-20"
github: "https://github.com/gauravreddy08/workbench"
---

## i use claude code to teach me cs

I'm a year into my first job. I train models, I ship demos fast, I've built GPT-2 from scratch.

I also skipped a lot of the basics during COVID. Coding agents make it easy to keep skipping them: the code works, the PR merges, and nobody asks why. But the questions that matter most in a design review or an interview are exactly those basics. *How does your solution scale?* Thread or process? Where does the time actually go?

I wanted real answers to those, not vibes. So I went back for them, with the same tool that made them easy to skip.

---

### claude quizzed me first

Before teaching anything, it ran a diagnostic to find where to start. Some things were already solid: load balancing, tail latency, the KV cache, ranking metrics. Others were worth going back to: memory layout, number formats, and a gut feel for numbers. How much slower is a disk read than RAM? A network hop than a cache hit?

Then it built a course around exactly those: [gtadkapally.com/learn-cs](https://gtadkapally.com/learn-cs)

63 lessons. Memory, networking, databases, scaling, then the ML side: serving models, training, evals, RL. Every lesson works the same way. Guess a number. Build the thing. Measure it. Explain it back in plain words.

The rule I gave it: plain words, full depth. Never drop detail, drop jargon. Every term gets defined in the margin, right where it shows up.

I read it on my phone. At work between runs, on flights, wherever.

---

### the podcast didn't work, at first

I wanted to listen too, so it turned every lesson into a two-host podcast.

The first version was a disaster. An hour of jargon. Every number, every step, read out loud. It felt like I needed to sit down with a notebook, which defeats the point of a podcast.

So we threw it out and rewrote every episode story-first. Around 15 minutes each. Almost no numbers, no formulas. Just: what problem forced this to exist, and what's the one idea.

That turned out to be the part I use most. If you're like me and need a hook before you can focus, listen first. You get the shape of the topic in your head, and then the lesson actually lands when you sit down with it. [The episodes are here.](https://music.youtube.com/playlist?list=PLN_1hGjwpaFk)

---

### it's for you too

I built it for me, so it talks about my DGX Spark and my ranking model. Swap in your own machine. It works the same.

The whole thing is [open source](https://github.com/gauravreddy08/workbench). Fork it, edit the reader profile in `CLAUDE.md` to describe your gaps, and Claude Code writes lessons for you instead of me.

Claude writes the lessons. I still have to type the code and measure the numbers. That part is the point.
