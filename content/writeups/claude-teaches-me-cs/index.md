---
title: "every cs course is written for someone else, so i had claude code write mine"
date: "2026-11-01"
github: "https://github.com/gauravreddy08/workbench"
---

## every cs course is written for someone else, so i had claude code write mine

I skipped a lot of CS fundamentals during COVID. Courses never fixed that for me. They're written for a generic student: they start at chapter one, spend weeks on what I already know, and rush the parts I actually need. And none of them know I'm serving models on a DGX Spark or training a ranker at work.

So I built my own. It's called Workbench, and it's live at [gtadkapally.com/learn-cs](https://gtadkapally.com/learn-cs). 63 lessons, from how memory works to serving LLMs, training, evals and RL. Every lesson works the same way: guess a number, build the thing, measure it on your own machine, explain it back in plain words.

![Workbench](/writeups/claude-teaches-me-cs/cover.png)

## starting from a diagnostic

Before writing a single lesson, Claude Code quizzed me across systems and ML. That diagnostic became the spec. Some things were already solid, like load balancing, tail latency, the KV cache and ranking metrics, so those lessons go deeper instead of starting over. The biggest finding was numbers: a gut feel for how slow a disk read is next to RAM, or how much memory a model really needs. So the course opens there.

## one style guide, one agent per lesson

The whole course hangs off one file, `CLAUDE.md`. It says who the reader is, how a lesson is structured, and one rule above all: plain words, full depth. Never drop detail, drop jargon. Every technical term gets defined in the margin, right where it shows up.

Then I ran one isolated agent per lesson, up to 20 at a time. What came out:

- 63 lessons
- 112 interactive figures
- 1,203 margin definitions
- 450 build tasks
- 174 "predict first" boxes

My favourite figure is the latency ladder. Flip it to human scale, where an L1 cache hit takes one second, and the first token back from an LLM API takes 16 years.

![The latency ladder](/writeups/claude-teaches-me-cs/latency-ladder.png)

## the agents ran the code

I told every agent to verify what it could by running it on my Mac. That turned up the best parts of the course.

The classic thread race, where `counter += 1` across threads loses updates, mostly doesn't happen anymore. Since Python 3.10 the interpreter only switches threads at certain points, so the textbook demo just runs clean. The lesson now forces the race with a `time.sleep(0)` between the read and the write, and explains why the old demo stopped working.

Python spends about 30 to 50 nanoseconds per step, and an L1 cache hit takes about 1. So measuring CPU caches in plain Python mostly measures Python. The fix was Numba, which compiles one Python function to machine code. The cache staircase showed up right away, from 1.5 ns per read to 126 ns once the data spills to main memory, within about 2% of the C version at the slow end.

One agent even corrected my brief. I'd written that a 500-question eval scoring 70% is accurate to ±2 points. It's ±4.

## the podcast, take two

I wanted something for walks and flights too, so every lesson got a two-host podcast episode.

The first version didn't work. It was an hour of jargon with every number read out loud, and it felt like I needed a notebook. So I rewrote the style guide for audio: ideas, not data, almost no numbers, one thread per episode, told as a story. 63 episodes, about 14 minutes each.

That turned out to be the part I use most. Listen first and you get the shape of the topic. Then the lesson lands when you sit down with it. [The episodes are here.](https://music.youtube.com/playlist?list=PLN_1hGjwpaFk)

## it keeps growing

Every word I hit in a job post, an interview or Slack goes into a gap inbox on the site. In Claude Code, "triage my workbench inbox" turns those into new lessons or stubs on the map.

Courses used to be something you adapted to. Now the course adapts to you. The whole thing is [open source](https://github.com/gauravreddy08/workbench): fork it, describe what you want to learn in `CLAUDE.md`, and it writes yours.
