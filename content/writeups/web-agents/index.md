---
title: "agents aren't there yet, and web agents are the hardest problem right now"
date: "2026-11-05"
description: "Why web agents were the first agentic problem we picked up and still one of the hardest to finish: context, speed, and a web that never sits still."
---

## agents aren't there yet, and web agents are the hardest problem right now

A few years ago, "agent" meant James Bond. Today you hear the word and you think of Claude. That shift alone says how many agents have shown up in the last few years, and really, the last few months.

One of the first agents we tried to build was a web agent: give a model a browser and let it do things for you. It's still one of the least solved. I'll admit I might be biased, since I work on this every day at TinyFish. But I believe it's one of the hardest agentic problems there is today. It was the first one we picked up, and we still haven't finished it.

Don't get me wrong. Harder problems will show up. But if you look only at agentic complexity, the web is about as hard as it gets right now. This post is about why.

## web agents touch every part of an agent

Think about what an agent needs:

- runs that persist over many steps
- good context management
- good tool choice and tool management
- some multimodal ability, like reading a screenshot
- both consuming and generating content
- fast generation, using inference tricks like speculative decoding

Most agents lean hard on two or three of these. A web agent needs all of them at once. I can't think of another agent that does. That's what makes it so hard.

<div align="center">
  <img src="/writeups/web-agents/every-part.svg" alt="A web agent needs every capability an agent has" width="90%">
</div>

## context: one wrong turn and the race is over

Web tasks are long. An agent has to do many things in a row and remember what it already did. If it takes a wrong turn halfway through a long navigation, that's usually the end of that run. You restart, or you try to resume from the step where it went wrong.

The page itself makes this worse. Even something tiny, like pressing the login button after typing your password, can go wrong, because the page might have changed in between. There are many ways people deal with this. But the brute force way is to hand the model the whole page before every single action. Do that for 50 steps and your context window fills up with pages the agent has already left behind.

## speed: nobody needs a genius to log in

People want one of two things from an AI tool: intelligence or speed.

With coding, it's intelligence. Someone who has never written Java can use a coding agent to write Java. They lean on the model's smarts because they don't have them.

The web is different. It's built for everyone. Logging into a site is simple. A kid can do it, not a 5 year old maybe, but a 10 year old for sure. Nobody is impressed that an agent can click "Sign in". What people want is for it to be fast.

That's the trap. Models keep getting bigger, and big models are slow. Each step means reading a page and deciding what to click, so every step pays the full price. And if you go down the rabbit hole of making it faster with smaller models, you usually just end up with a worse web agent.

## why coding got good first

Most of the progress we see in LLMs today is in coding. I think there's a simple reason: code is close to deterministic.

There are many ways to write code that does the same thing, but they all fall inside a fairly small set of patterns. And when you arrive at a solution, you know it. The tests pass or they fail.

The web has no such luck. Ordering something, from login to the final payment, looks completely different from one site to the next. Take Best Buy and Amazon. You'd put those names side by side, but buying a TV on each one is a completely different flow. Code doesn't vary that much.

<div align="center">
  <img src="/writeups/web-agents/code-vs-web.svg" alt="Code converges to a checkable answer. The web branches into a different flow on every site" width="90%">
</div>

## where's the data for the web?

Remember scaling laws? They're about architecture, but they also say you need more data. So where is the data for the web?

The web changes every day. There's no fixed dataset to hold on to. Say you collected 100K web tasks. I'm sorry to tell you, but 60K of them could break tomorrow, and you can't do anything about it. If those sites decide to change, they change.

With code, you can write 100K examples with known solutions and train on them over and over. You get rewards you can trust: the code runs and the tests pass, or it doesn't. That's how you train and align a model to write better code, and that's why it keeps getting better at code.

Math works the same way. Labs keep announcing models that solve problems people worked on for decades. That's not easy, but math is checkable. Anyone can check that 1 + 1 = 2. You can't check, in the same clean way, whether an agent took exactly the right steps to get to the payment page.

The web isn't static and it isn't deterministic. And if you train your agent on static copies of web pages, it stops working on the live, dynamic ones.

## so is it solved?

Partly. Agents can handle a good chunk of the web today, and a lot of teams, us included, are working on the rest. But a large part of the web is still not solved, and it's not as close as people think.

## the web was never built for agents

I think the core reason this is so hard is simple. The web, with its wide pages and colourful cards on every screen, was never meant to be browsed by an agent. It's what we built over the whole history of the internet, for humans, to be intuitive for us.

Now, suddenly, we're trying to make agents use it. It's very hard for AI to take in the same content in the same way humans do.

So either we find another way for agents to consume the web, or we solve this problem as it stands. Either way, it's the most interesting problem to work on right now.
