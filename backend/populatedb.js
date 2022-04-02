#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require('async');
const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');

const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const users = [];
const posts = [];
const comments = [];

function userCreate(username, password, comments, isAdmin, cb) {
  let userDetail = {
    username: username,
    password: password,
    comments: comments,
    isAdmin: isAdmin,
  };
  const user = new User(userDetail);

  user.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New user: ' + user);
    users.push(user);
    cb(null, user);
  });
}

function postCreate(title, content, Date, comments, cb) {
  const post = new Post({
    title: title,
    content: content,
    Date: Date,
    comments: comments,
  });

  post.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New post: ' + post);
    posts.push(post);
    cb(null, post);
  });
}
function commentCreate(content, Date, name, cb) {
  const comment = new Comment({
    content: content,
    Date: Date,
    name: name,
  });

  comment.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Comment: ' + comment);
    comments.push(comment);
    console.log('comments array: ', comments);
    cb(null, comment);
  });
}

function createProductsCategories(cb) {
  async.series(
    [
      function (callback) {
        commentCreate(
          'Opening his morning comment, she read.',
          new Date(),
          'Farouk',
          callback
        );
      },
      function (callback) {
        commentCreate(
          'He repeated her comment about the Porsche, "Nice wheels."',
          new Date(),
          'John',
          callback
        );
      },
      function (callback) {
        commentCreate(
          'Without comment, he shifted his attention back to his plate.',
          new Date(),
          'Mac',
          callback
        );
      },
      function (callback) {
        commentCreate(
          'She sensed this comment was directed at her.',
          new Date(),
          'Sergio',
          callback
        );
      },
      function (callback) {
        commentCreate(
          'I think she was merely directing the comment at you because she thought you might want to know.',
          new Date(),
          'Stereo',
          callback
        );
      },
      function (callback) {
        commentCreate(
          "The man just nodded but didn't comment further.",
          new Date(),
          'theDude',
          callback
        );
      },
      function (callback) {
        commentCreate(
          'It was this that saved her from some snide comment about her less-than-fashionable clothes.',
          new Date(),
          'TheGuy',
          callback
        );
      },
      function (callback) {
        commentCreate(
          'One of the ladies who worked at the courthouse made an offhand comment about the popular Lucky Pup Mine.',
          new Date(),
          'runThemStreets',
          callback
        );
      },
      function (callback) {
        commentCreate(
          'Before Dean could comment, the conversation ended as a commotion upstairs called for his attention.',
          new Date(),
          'cringeName',
          callback
        );
      },
      function (callback) {
        commentCreate(
          'At least he was considerate enough not to comment on her obvious interest in his physique.',
          new Date(),
          'moreCringeButYeah',
          callback
        );
      },
      function (callback) {
        userCreate(
          'faroukhamadi',
          'passwordfarouk',
          [comments[0], comments[1]],
          true,
          callback
        );
      },
      function (callback) {
        userCreate(
          'hayetmejri',
          'passwordhayet',
          [comments[2], comments[3]],
          false,
          callback
        );
      },
      function (callback) {
        userCreate(
          'mihyarhamadi',
          'passwordmihyar',
          [comments[4], comments[5]],
          false,
          callback
        );
      },
      function (callback) {
        userCreate(
          'nardinehamadi',
          'passwordnardine',
          [comments[6], comments[7]],
          false,
          callback
        );
      },
      function (callback) {
        userCreate(
          'aoushamadi',
          'passwordaous',
          [comments[8], comments[9]],
          false,
          callback
        );
      },

      function (callback) {
        postCreate(
          'The Cheesecake Factory: Use humor and great photos',
          `For a long time, I sucked at sleep.

But a handful of years ago I started to wonder if I might be capable of learning to sleep better: I started thinking it might be a skill I could work on, rather than an external variable over which I lacked any power.

There are still nights, every once in a while, when my internal processes are in flux and no matter how mightily I struggle I can't make it work; I'm a zombie the next day and it sucks.

Much of the time, though, I feel pretty confident I'll get around eight hours of shut-eye each night and that those hours will be productive in the sense that I wake feeling rested and regenerated rather than sluggish or drained.

Reaching this (still imperfect, but way better than before and still-improving) point has taken a lot of time and effort. It's also required semi-regular recalibrations and experimentation; everyone's different, and those differences extend to how we optimally prepare for and undertake the process of putting ourselves to sleep.

In general, though, it helps to turn down lights, set aside screens, turn down the thermostat, and engage in calming, winding-down activities in the hour or so leading up to your planned bedtime.

I personally find (and there's some research to back this up) that reading fiction in bed (on a non-backlit Kindle screen, but a soft reading light and tangible book works, too) puts me in the right state of mind for a restful segue into drowsiness. I also find that reading a bit of poetry before heading to bed amplifies that effect (this is a relatively new habit, but it's been really enjoyable so far).

Blackout curtains are magical, and if you can avoid working where you sleep and either remove or cover all sources of light in your bedroom, you'll tend to have better slumber-outcomes (there's research for that latter point, as well).

A little meditation (or pseudo-meditation, like calmly sitting and thinking without distraction for five or ten minutes) can help too, I find. It's useful to untangle our minds and bring worries and concerns to the forefront so they can be addressed before getting into bed (which in turn helps ameliorate those “can't conk out because my mind won't shut up” sorts of sleeplessness).

It can also be beneficial to stop eating and drinking (anything but water) by 8pm. Your timing on this will vary, but the idea is to stop consuming stuff an hour or two before you begin segueing toward sleep so your stomach's activities don't keep the rest of your body from fully shutting down.

None of this is revelatory—and again, I'm still working on this myself after years of not thinking anything sleep-related was within my power to tweak—but getting consistent, quality sleep (and knowing I can get it) has been such a value-add to my life that I like to periodically bring it up in the hope that these little tip tidbits might help spark positive change (and sleep-empowerment) for someone else, as well.`,
          new Date(),
          [comments[0], comments[1]],
          callback
        );
      },
      function (callback) {
        postCreate(
          'Google: Share interesting customer stories',
          `I spend a meaningful amount of time curating what I think of as my “inputs”: data from informational sources (news and nonfiction), but also experiential sorts of things like music and fiction and other aesthetic experiences.

My ideal outcome is to maintain a generally informed sense of the world and of myself while planting seeds for future pursuits and working on my ability to dig deeper into anything that catches my attention.

Alongside that informational ambition, I also aspire to always be generating little sparks of interest, stoking my curiosity and awe, and generally remaining intellectually, emotionally, creatively, and humanely awake and engaged.

Said another way: I want to be healthy, fulfilled, excited about life, feel generally good, know about things, and be in a position to both discover new potential passions and to cultivate any passions that've already caught my interest.

We are influenced and shaped in countless ways by the variables in our environments, and while some of these influences are from earlier in our lives and planted deep, a lot of them are more contemporary, transient, and manipulatable.

So the theory is that in addition to the superficial enjoyment (or lack thereof) I might experience directly and immediately as a consequence of listening to a specific album of music or engaging with a particular painting, if I can consciously wrangle these elements on a consistent basis, I can end up with generally better outcomes, overall, across many aspects of my life, beyond the bracketed moments in which I'm actually engaging with these things.

This approach has paid off pretty well over the half-dozen or so years I've been operating in accordance with it, but I've discovered along the way (and this seems obvious in retrospect) that a perfectly balanced set of inputs doesn't exist, and a nicely balanced set of inputs can only ever be temporary.

There's no perfectly balanced portfolio of inputs because there are countless possible things to which we might expose ourselves, and even more combinations of such things.`,
          new Date(),
          [comments[2], comments[3]],
          callback
        );
      },
      function (callback) {
        postCreate(
          "Tony's Chocolate lonely: Show people what's happening",
          `A paradigm is a state of being; a status quo for a given moment in time.

A paradigm shift is what happens when variables change in such a way that the status quo changes measurably or perceptually.

Post-WWII Europe was a very different place than pre-WWII Europe: the paradigm shifted because so many variables changed.

The same is true of the pre-smartphone and post-smartphone paradigms. It doesn't seem like the introduction of a consumer electronics product category would change much of anything, but the world (economics, relationships, governance, everything) shifted dramatically in mere years as a direct consequence of this device-type landing on the market.

This concept, though typically applied to macro-scale concerns, can also be applied on a personal level.

If you move from one city to another, you'll tend to experience a paradigm shift: everything has changed, from the keys in your pocket to the grocery store you typically visit to the people you see on a daily basis to how you get around and where you go.

Part of what makes a paradigm shift so meaningful is that all of these changes cause countless other changes, rippling forever outward from that initial change-droplet.

The arguably applies on a smaller scale, as well.

After hearing a song by an unfamiliar artist, I'm a different person than I was before I heard it: my exposure to new creative work changed me, even if only in minuscule ways.

Each of those tweaks—in how I'm feeling, how I think, what I consider normal and possible and good—can have multitudinous downstream effects. Those effects, in turn, can influence my next-step status quo; my new mini-paradigm.

Thinking in these terms helps me remember that I have the capacity, if I apply my efforts and attention intentionally over time, to produce significant and positive change in my own life and in society as a whole.`,
          new Date(),
          [comments[4], comments[5]],
          callback
        );
      },
      function (callback) {
        postCreate(
          'The Clay Creative Co: Increase followers with giveaways',
          `As humans, we're nudged by our biologies to wonder what's on the other side of every mountain and driven to push ever-outward in a million directions at once.

We're not built to tolerate uncertainty. It's stressful! It might portend danger. No unknowns for me, thanks.

Our drive to figure things out exposes us to new uncertainties, though. The act of exploration and discovery solves some mysteries, but also tends to unveil new ones.

This dispositional incongruity can be crazy-making, as it can—suddenly and without warning—make even familiar places, people, ideas, routines, and relationships seem strange and volatile.

What we perceived as being stable yesterday might reveal itself to be anything but, today. And that change of status can be the consequence of shifting variables beyond our control, but it can also result from learning something new: cresting a metaphorical mountain and putting old uncertainties to rest while concurrently encountering brand new ones.

This process can be exhausting.

Our brains aim for energetic efficiency, and to that end they build frameworks of the world so a lot of what we do on a daily basis can be shorthanded.

This is how the world works, this is how I perform the tasks I undertake daily, this is how various things in my environment are connected to each other.

These mental models (called “heuristics”) allow us to function without having to re-compute every single thing we do every single day. It saves a lot of cognitive bandwidth.

When something happens that violates these frameworks, however, we're thrown for a loop that can be both unnerving and more energetically expensive than our typical mode of operation.

We thought things worked one way, but actually maybe they don't.

Oh no oh no oh no.

Our brains then scramble to collect data to fill in the gaps and build a new framework.

This can be stressful and exhausting, and can put us on edge because our understandings of things—which tend to serve as foundations for other understandings—no longer seem as solid and secure.

At times, the best response to sudden uncertainty of this kind is to seek out new information and fill in the gaps. We've got plenty of motivation to do so, and this can sometimes be an excellent moment to climb some more mountains, take a long look around, and open ourselves up to re-learning all sorts of things.

In other cases, though, it's prudent to pull back a bit, hunker down, and restock our psychological reserves.

This is especially true when the uncertainties we face seem likely to remain uncertain for a while, no matter how much info we scramble to collect, because new certainties—new bases for future frameworks—haven't coalesced yet; the variables that've been upended haven't stabilized and are likely to keep changing shape for a while.

It's seldom ideal to remain intentionally ignorant about things happening around us, then, but it's prudent to understand the difference between things that are knowable and things that are currently in flux—the psychological cost of trying to build new mental models predicated on either heads or tails when the coin is still in the air, and is likely to remain there for some time.

The right balance of info-seeking and well-being maintenance is worth pursuing, then, whether we're in the midst of a bad breakup, a global pandemic, a rapidly escalating international conflict, or any other unknown that may trigger large quantities of stress and unrest.`,
          new Date(),
          [comments[6], comments[7]],
          callback
        );
      },
      function (callback) {
        postCreate(
          'Social Media Examiner: Share your expertise',
          `I tend to believe the truism, “There's no bad weather, only unsuitable clothing.”

Many times I've found myself in the middle of storms, walking through ice-glazed landscapes, slogging along humid paths and beaches, and my enjoyment or misery will be directly correlated to what I'm wearing, or in some cases how I'm otherwise prepared for that scenario.

With a waterproof jacket, hood, and boots, the rain and wind are not just tolerable, but maybe even invigorating.

Properly bundled and layered, the ice and snow and biting cold are brisk and satisfying companions, not skin-shattering, jaw-juddering antagonists.

Sticky, sultry humidity becomes relaxing and restorative when suitably light, breathable, maybe even scanty clothing is draped or donned.

The right combination of gloves or sunscreen or sunglasses or a wide-brimmed hat or scarves or lotion or breathable but effective masks can convert a trying, uncomfortable, even risky scenario into something palatable or pleasant.

We all differ in our preferences and predispositions, so some of us will need more layers than others to tolerate wintery weather, while others (myself included) will require more shade and sunscreen and the breeziest of garments if soupy, shirt-soddening tropical temperatures are going to be anything but miserable.

The same applies to others aspects of life, I think.

Uncertainty is undesirable for most of us, most of the time, but having stabilizing infrastructure in place—economic, interpersonal, psychological, physical—can make it more tolerable and even somewhat enjoyable, in some cases, through some lenses.

Likewise, a deluge of seemingly unintelligible information and narratives cascading into our lives each day can be stressful and bothersome, but the more we know about more things, and the more we're able to connect those things to other things, the greater our capacity to imbue ominous or confounding information with nervousness-neutralizing meaning.

Our capacity to understand what's happening in the world around us can help us filter the emotionally manipulative commentaries from the meaningful data points, which in turn can help us avoid or annul anxiety-inducing agitations that would otherwise taint our informational diets.

By investing in our health, understanding, and the spaces we occupy, we're outfitting ourselves with the optimal attire to recognize and harmonize with the variables influencing our lives.`,
          new Date(),
          [comments[8], comments[9]],
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createProductsCategories],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('posts: ' + posts);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
