# Silbertablett Design Doc

## Basic Syntax for Presentations

```jsx
<AG author="First Last" twitter="@FirstLast" homepage="firstlast.com">
    <Slide>
        <h1>My Title Slide</h1>
        <AuthorBox />
    </Slide>
    <Slide>
        <Title>A Slide Title</Title>
        <Step>Hello There!</Step>
        <Step>
            <Markdown>
                This is some *cool* markdown! 
            </Markdown> 
        </Step>
    </Slide>
    <Slide background="an_image.jpg" transition="fade">
        <Note markdown={true}>
            This is a *rich* note!
        </Note>
        <StepList ordered={false}>
            - First Item
            - Second Item
            - Third Item
        </StepList> 
    </Slide>
</AG>
```

- Where should this file be located?
- Maybe a `<Presentation>`-Component which will be called automatically and passed the `StateMachine`-Instance?


## (Possible) Commands

- `develop [--port=8080]`: serves up slides and watches for changes
- `serve [--port=8080]`: serves up slides as "static" (whatever that may mean)
- `html [--output]`: spits out "static" HTML slides (maybe for better SEO?)
- `pdf [--output]`: outputs to a pdf (for things like slide share)


## Architecture

The `<Reenact>`-Component will parse its children and build up an index of slides and push those into a 
`StateMachine`. This `StateMachine` is responsible for `.next()` and `.prev()`. Each `<Slide>`-Component
will also parse its children for `<Step>`-Components which will also be added to the `StateMachine`.


Also all `<Note>`-Components will be gathered and saved (with reference to the slide) to be displayed separately. 
Probably in a new window using a LocalHost push service.



## Advanced Features

This could transform the first child, into the second, as a step:
```jsx
// ...
<Slide>
    <Transform>
        <div class="foo">Hello From .Foo</div>
        <div class="bar">Hello From .Bar</div>
    </Transform>
    // OR
    <Step transform={true}>
        <div class="foo">Hello From .Foo</div>
        <div class="bar">Hello From .Bar</div>
    </Step>
</Slide>
// ...
```

Code highlighting without markdown (highlighter could be replaced):
```jsx
// ...
<Slide>
    <Code language="js">
       alert('blub'); // will display a 'beautiful' alert box.
    </Code>
</Slide>
// ...
```

Titles, that could animate cleverly, i. e. move to the top on a step progression:
```jsx
// ...
<Slide>
    <Title toTop={true}>This is my slide's title</Title>
</Slide>
// ...
```

Fit text to screen:
```jsx
// ...
<Slide fitText={true}>
    Lorem Ipsum Dolor, bla bla bla
</Slide>
// ...
```

Find the best contrasting colour for text againts the background image:
```jsx
// ...
<Slide background="some_image.png">
    <Title adaptiveColour={true}>This is my slide's title</Title>
</Slide>
// ...
```
