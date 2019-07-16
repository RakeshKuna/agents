# Props
| Props     |Type                                           | Default  | Description|
| :------------------- | :------------------- | :------ | :---------------------------------------------------------------------------------------- |
| id | string                                         | | for unique identification. |
| showDots | boolean | false | show dot indicators |
| showArrows | boolean | true | show/hide arrows |
| dotsPosition |oneOf( "top-right", "top-center", "top-left", "bottom-right", "bottom-center", "bottom-left", "left-center", "right-center", ), | bottom-center | position of the dots to be shown |
| isSwippable | boolean | true | enable swiping |
| slidesToShow | number | 1 | # of slides to show |
| slidesToScroll | number | 1 | # of slides to scroll |
| isLoop | boolean | true | infinite loop sliding |
| initialSlide | number | 0 | slide to start on |
| animation | oneOf("fade" ,"slide" ) | slide | animate slide or fade effect |
| autoplay | boolean | false | enables Autoplay |
| autoplaySpeed | number | 300 | autoplay Speed in milliseconds |
| centerMode | boolean | false | enables centered view with partial prev/next slides. Use with odd numbered slidesToShow counts |
| margin | string | 0 | margin to the content can be in px or % |
| nextArrowIcon | string, element |  | allows you to select a icon or customize the HTML for the "Next" arrow |
| prevArrowIcon | string, element |  | allows you to select a icon or customize the HTML for the "Previous" arrow |
| nextArrowIconStyle | object |  | custon style for "Next" arrow icon |
| prevArrowIconStyle | object |  | custon style for "Previous" arrow icon |
| lazyload | boolean | false | enable lazy load of images on default "ondemand" if true "progressive"  |
| afterChange | function |  | fires after slide change |
| beforeChange | function |  | fires before slide change |
| onInit | function |  | fires after first initialization. |
| umClass | string |  | |
| umDotsClass | string |  | class for slide indicator dots container |
| rtl | boolean | false | rtl mode  |


# Usage
```js
import { Carousel } from 'finablr-ui';

<Carousel
    showDots
    infinite
    slidesToShow={1}
    slidesToScroll={1}
>
    {CONTENT}
</Carousel>

<Carousel
    showDots
    infinite
    slidesToShow={3}
    slidesToScroll={1}
    dotsPosition="bottom-left"
    afterChange={this.handleChange}
>
    {CONTENT}
<Carousel/>

CENTER MODE
<Carousel
    showDots
    infinite
    speed={0}
    slidesToShow={3}
    slidesToScroll={1}
    dotsPosition="bottom-right"
    nextArrowIcon="chevron-double-right"
    prevArrowIcon="chevron-double-left"
    nextArrowIconStyle={{
        color: "red",
    }}
    prevArrowIconStyle={{
        color: "red",
    }}
    centerMode
    >
    {CONTENT}
<Carousel/>
 ```

# Event Handler

```js

  handleChange() {
    alert("Event HAndler");
  }

<Carousel
    showDots
    infinite
    speed={300}
    slidesToShow={3}
    slidesToScroll={1}
    dotsPosition="bottom-left"
    centerMode
    afterChange={this.handleChange}
>
    {CONTENT}
<Carousel/>


```
