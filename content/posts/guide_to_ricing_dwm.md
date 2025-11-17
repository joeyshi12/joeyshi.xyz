---
title: Guide to ricing with dwm
description: How to setup a nice desktop environment with tiled windows.
date: 2025-10-17T18:37:29-07:00
tags:
  - linux
toc: true
---

One of the main draws of Linux is the fact that you can customize your system however you want.
There are numerous examples of creative desktop designs on
[r/unixporn](https://www.reddit.com/r/unixporn/) to draw inspiration from.
This guide will walk through how to implement your own desktop design on top of
the suckless [dynamic window manager](https://dwm.suckless.org/) (dwm).

## About suckless and dwm

![dwm desktop](/img/dwm_blue.webp)

Suckless is a software community that produces software projects like
dwm (window manager) and st (terminal).
The common theme of these projects is that they are written in very few lines of C code.
By default, the software come with very few features, so the way to use them
is by applying patches to the source code and building the project with their `Makefile`.
This will be difficult, if this is the first Linux desktop you're driving or you're unfamiliar with C:
getting all your workflows and applications to a functional state in this window manager can be a big time sink,
so using Gnome or KDE is a better option in terms of convenience.
However, if you're open to try something different, working on dwm customizations
for your own personal desktop experience is the coolest feeling.

## Setting up dwm

After a fresh Arch Linux install, install a terminal and application launcher.
For example,
- Terminal: `alacritty`
- Application launcher: `rofi`

Clone the repository to `~/.local/src/dwm` and build the project.

```sh
git clone https://git.suckless.org/dwm ~/.local/src/dwm
cd ~/.local/src/dwm
make
```

Inside `~/.local/src/dwm/config.h`, update the command arguments for spawning
your terminal and application launcher.

```c
static const char *roficmd[] = { "rofi", "-show", "drun", NULL };
static const char *termcmd[] = { "alacritty", NULL };
...
static const Key keys[] = {
    /* modifier          key         function  argument */
    { MODKEY,            XK_p,       spawn,    {.v = roficmd } },
    { MODKEY|ShiftMask,  XK_Return,  spawn,    {.v = termcmd } },
    ...
```

By default, `MODKEY` is Alt, so your basic controls will include

| Key combo       | Action                                |
|-----------------|---------------------------------------|
| Alt+Shift+Enter | Spawn terminal                        |
| Alt+p           | Spawn application launcher            |
| Alt+[1-9]       | Switch to workspace [1-9]             |
| Alt+Shift+[1-9] | Move active window to workspace [1-9] |
| Alt+Shift+q     | Quit desktop                          |

Build the `dwm` binary and move it to your `/usr/share/bin` folder.

```sh
sudo make install
```

Install [xinit](https://wiki.archlinux.org/title/Xinit).

```sh
sudo pacman -S xorg-init
```

Finally, create an `.xinitrc` file in your home directory and startup your desktop environment.

```sh
echo "exec dwm" > ~/.xinitrc
startx
```

## Side tangent on window organization

The primary way of organizing your windows is by logically grouping them into different workspaces.
For instance, I keep my browser windows in workspace 1, editors and terminals in workspace 2,
drawing apps in workspace 3, messaging apps in workspace 4, and password manager in workspace 5.

The benefit of this setup is that no effort is spent on searching windows via alt-tabbing:
you can directly jump to the application you want with Alt+[1-9].
If you want to combine windows from another workspace into your current view temporarily,
Alt+Ctrl+[1-9] will combine windows in your current view with windows in your selected tag.
Navigating to another workspace or running Alt+Ctrl+[1-9] on the same tag will toggle it off.

It takes a few minutes to get used to, but when the muscle memory kicks in,
you'll be able to focus for longer periods of time from not needing to dig for specific windows.

## Customizing your system

`config.h` is where you declare useful constants and setup your keybinds
which you likely realized while setting up dwm.
This section will cover other aesthetic and quality of life enhancements
you can make to your dwm build.

### Autostarting dwm

After the initial setup, to enter your desktop environment after booting in,
you need to run `startx`. To have your desktop environment autostart,
I recommend adding the following to your `.profile` or `.zprofile` if your shell is `zsh`:

```sh
if [ -z "$DISPLAY" ] && [ "$XDG_VTNR" = 1 ]; then
  exec startx
fi
```

Now, if you boot into your OS, your desktop environment will start after logging in.
Alternatively you can setup a display manager like [lightdm](https://wiki.archlinux.org/title/LightDM)
if you want a conventional login screen. Although, I don't do this.

### Status bar

On the top right of your screen shows `dwm-X.X` in the statusbar.
This text can be updated by changing the value of the `WM_NAME` property of the root window.

```sh
xsetroot -name $(date)
```

To update this status bar every second, we can create a shell script that runs
the above command in a loop.
In my setup, I wrote the C program equivalent which you can clone and build with

```sh
git clone https://github.com/joeyshi12/dwmstatus ~/.local/src/dwmstatus
cd ~/.local/src/dwmstatus
make
```

Add a line in your `~/.xinitrc` that executes my status bar daemon
and restart your desktop server by quitting with Alt+Shift+q and starting it up again with `startx`.

```sh
~/.local/src/dwmstatus/dwmstatus &
exec dwm
```

### Task bar font

After the previous step, you'll notice that some icons might not be rendered properly.
That is, you'll see box outlines instead of proper icons.
This is because you're missing a font set that includes icons.

Fonts for the status bar are declared as `static const char *fonts[]` in `config.h`.
The reason `fonts[]` is an array of strings is because it determines the order
in which fonts should be applied (first to last).
If a character glyph doesn't exist in fonts in the array, dwm will find an arbitrary
font set installed in your system that includes the character.

Find a font family you like in the Arch repo with `pacman -Ss ttf-`.
You'll notice some packages include a suffix `-nerd` to indicate that they're
a patched font set with icons included.
Install a non-nerd font set and a nerd font set and update your font cache with `fc-cache -v`.
Then, by setting

```c
static const char *fonts[] = { "<non-nerd-font>:size=11", "<nerd-font>:size=20" };
```

in your `config.h`, text icons will appear bigger in the status bar.
You can search for the correct font-family name from `fc-list` and
validate that the correct font will be picked up by the name by running `fc-match "<font-name>"`.

### Modifying the dwm source code

The typical way to add new behaviour and features to dwm is by applying
[community patches](https://dwm.suckless.org/patches/) via `git apply`.
The only one I use is [movestack](https://dwm.suckless.org/patches/movestack/) which allows
you to move the focused window up and down the stack with Alt+Shift+{Up, Down}.

To make custom changes, take a look at `dwm.c` to see the 
core window manager behavioural logic and `drw.c` to see the available drawing functions.
Here are some modifications you can make in `dwm.c`

- In `setup(void)`, update `bh = drw->fonts->h + 2` to `bh = drw->fonts->h + vbarpadding`
and define a constant `vbarpadding` in `config.h` to make the vertical padding of your task bar easier to configure.
- In `drawbar(Monitor *m)`, add the following inside the for-loop iterating over workspace tags
to draw a rectangle underline for tags that you have selected.
    ```c
    if (m->tagset[m->seltags] & 1 << i)
        drw_rect(drw, x, bh - 2, w, 2, 1, 0);
    ```

If you need more examples to learn from,
look at other people's builds of [dwm on Github](https://github.com/search?q=path%3A%22dwm.c%22&type=code).
My favourites are

1. [Mine](https://github.com/joeyshi12/dwm)
2. [Also mine](https://git.joeyshi.xyz/joey/ryo-dwm)
3. [chadwm](https://github.com/siduck/chadwm)

## Remarks

If you made it this far, you now have the toolkit to construct the desktop of your dreams.
You'll want to backup the work you've done on Github or some other version control service.
Customizing other components of your desktop like your terminal, application launcher, or
notification daemon is another can of worms.
I recommend looking through examples of dotfiles on [r/unixporn](https://www.reddit.com/r/unixporn/)
for styling inspiration and reading documentation for the component you're customizing to go further.
Happy ricing!
