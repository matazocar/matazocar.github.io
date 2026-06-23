---
title: Counting monochromatic triangles (and cliques?)
date: 2026-06-23
tags: research, Ramsey theory
summary: We talk about the number of monochromatic copies of triangles (and other cliques) in $r$-edge coloured graphs, also giving a look into the asymptotics.
---




Today I was studying from the [notes](https://yufeizhao.com/gtacbook/gtacbook.pdf) of Yufei Zhao in Graph Theory and Additive Combinatorics, as a general reminder and also because is the textbook my professor is using for his Extremal Combinatorics lectures.

Everything looked very normal until I saw a little innocent exercise of "true or false".

>*Exercise 0.1.16(a)* 
    If the edges of $K_n$ are colored using $2$ colors, then at least ${1/4}~{-o(1)}$ fraction of all triangles are monochromatic. (Note that $1/4$ is the fraction one expects if the edges were colored uniformly at random.)

And, as a matter of fact, I was not sure of the answer. Thus, I started to investigate a little bit more and found a [thesis/paper](http://hdl.handle.net/1903/31701) about it from Brady and Gasarch titled "A pedagogical Approach to Ramsey Multiplicity".

The premise is simple. We know that in every $2$-edge-colouring of $K_6$ there exists a monochromatic triangle (due to the Ramsey number $R(3,3)=6$). Moreover, there are actually *two* monochromatic triangles (could have the same colour). But, even more interesting, every $2$-edge-colouring of $K_n$ yields *asymptotically* at least $n^3/24$ monochromatic triangles (that is, around the number one could expect from a random colouring!).

To my surprise, this was actually known, and the proofs are done through elemental counting techniques and some case distinction.

To state this, we are introduced to the following definition

$$
\psi_r(k,n)=\min_{\varphi\colon E(K_n)\to [r]}|\{H\subseteq K_n\colon H\cong K_k \text{ and } \varphi_H\text{ is constant.}\}|
$$
in other words, what is the minimum amount of monochromatic copies of $K_k$ that will contain $K_n$ given any $r$-edge-colouring of its edges.

And, following the same line of thought, they also define what is the *Ramsey Multiplicity*.

$$
\text{RM}_r(k)=\lim_{n\to \infty}\frac{\psi_r(k,n)}{\binom{n}{k}}
$$

which represents whe minimum density of monochromatic cliques of size $k$ in any $r$-edge-colouring of $K_n$ as $n$ gets large.

This is all I've read so far, but I think it's interesting enough to take a look and then go back to Zhao's notes.