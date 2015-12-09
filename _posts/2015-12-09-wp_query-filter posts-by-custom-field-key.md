---
layout: post
title: WP_Query - List posts by meta field.
---

Retrieve an array with all (published) post IDs for (queryable) post types having a custom field `my_meta_field` with a value (string).

```
$args = array (
    'post_type' => get_post_types(),
    'showposts' => -1,
    'meta_query' => array (
        array (
            'key' => 'my_meta_field',
            'value' => '',
            'compare' => '!='

        )
    ),
    'post_status' => 'publish',
    'fields' => 'ids'
);

$query = new WP_Query($args);
```

Note, by calling `new` constructor before [`WP_Query`](https://codex.wordpress.org/Function_Reference/WP_Query) we keep the query within the new instance and don't pollute the global query.
So there is no need for [`wp_reset_query()`](https://codex.wordpress.org/Function_Reference/wp_reset_query)


```
// use The Loop
while($query->have_posts()){
    // do sth
    echo get_the_ID().'<br>';
}

// or foreach yourself
foreach($query->posts as $post_id){
    // do sth
    echo $post_id.'<br>';
}
```
