# SecureGate — Reflection & Engineering Analysis
**Name:** Martha Igwe
**Cohort:** Design to MVP Bootcamp
**Live URL:** https://secure-gate-ten.vercel.app/
**GitHub Repo:** https://github.com/Missking001/SecureGate
 --
 
## Part 1 — What I Built
SecureGate is a login and security system built with Next.js, TypeScript, 
Prisma, and NextAuth. It lets users sign up, verify their email, log in, 
reset their password and access a protected dashboard. Every part of it 
was built with security in mind. Passwords are never stored as plain 
text, tokens expire and the system limits how many times someone can 
try to log in before getting blocked.
 
## Part 2 — What Surprised Me
I never expected to get so deeply invested in error handling but working on SecureGate showed me how important it is to handle errors properly, I found myself spending hours debugging and testing for edge cases that I didn't know existed, this made me realize that building a secure system is not just about writing code but also about anticipating potential problems and handling them gracefully. I also found myself trying to build for functionality and not to build blindly because before now, I just focused on result but in this case, I wanted more than result, i wanted clarity, i wanted to understand the depth of what each line of code does and its implications, it was a long but rewarding journey. i'm still very surprised that i couldn't finish in three hours but i am glad i got the opportunity to be part of this task.
 
## Part 3 — Engineering Laws Quiz
 
### Q1 — Murphy's Law
**Code reference:** `src/app/api/auth/[...nextauth]/route.ts` lines 34-48
**My Answer:** Anything that can go wrong will go wrong 
**What goes wrong if ignored:**  login rate limiting, someone can keep guessing passwords forever 
until they get in. Without the forgot-password limit, someone can abuse 
the form to send thousands of emails from our account, getting us flagged 
as spam and stopping real emails from reaching real users.
 
### Q2 — Law of Leaky Abstractions
... [repeat this pattern for all 15 questions]
 
## Part 4 — One Thing I Would Refactor
The as anycast in route.ts reset passwordis the 
first thing I would fix. The token field is passed in the request body 
but is not part of the reset password schema Zod validation, so 
TypeScript doesn't know it exists and the cast bypasses all type 
checking for it. The refactored version adding token directly to the Zod schema so the entire request body is 
validated and typed in one place, the manual null check becomes 
unnecessary, and the as anycast disappears

[Describe your identified technical debt and paste the refactored version]
 
## Part 5 — How This Changes How I Build
Before SecureGate I thought setting up authentication meant installing 
NextAuth and following the getting started guide. I now understand that 
every single decision in an auth system has a specific reason and a 
specific failure mode if you skip it.
