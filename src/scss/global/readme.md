# Global

The global styles starts with a basic reset, followed by initial styles on the default html elements.

For example:

```scss
body {
  default: styles for body
}

h1,
h2,
h3 {
  line-height: 1.1;
}

h1 {
  font-size: font-size;
}

blockquote {
  styling for: this
}

a {
  color: currentColor;
}

:focus {
  outline: 1px solid color;
  outline-offset: 0.25rem;
}
```

To get some overview we difide this in separate files like:

```
_reset.scss
_root.scss
_base.scss
_typography.scss
```
