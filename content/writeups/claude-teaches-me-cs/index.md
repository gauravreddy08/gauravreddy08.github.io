---
title: "i use claude code to teach me cs"
date: "2026-10-20"
github: "https://github.com/gauravreddy08/workbench"
---

## i use claude code to teach me cs

I'm a year into my first job. I train models, I ship demos fast, I've built GPT-2 from scratch.

And I still couldn't tell you the difference between a thread and a process.

I skipped a lot of the basics during COVID. Coding agents made it easy to keep skipping them. The code works, the PR merges, nobody asks. Until an interviewer does: *"how does your solution scale?"* And I had nothing.

---

### so i asked claude to quiz me first

Before teaching me anything, it ran a diagnostic. It turned out I thought the stack was a queue, I had bf16 and fp16 backwards, and I had no feel for numbers at all. How slow is a disk read compared to RAM? No idea.

Then it built me a course around exactly those gaps: [gtadkapally.com/learn-cs](https://gtadkapally.com/learn-cs)

63 lessons. Memory, networking, databases, scaling, then the ML side: serving models, training, evals, RL. Every lesson works the same way. Guess a number. Build the thing. Measure it. Explain it back in plain words.

The rule I gave it was simple: if a sentence has three words I don't know, I'm lost. So every term gets defined in the margin, right where it shows up.

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
