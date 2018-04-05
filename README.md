### XLS to PHP parser/writer

## Purpose
This app takes information from a copule php files and and xls spreadsheet and uses some of the info to update a different php file.

Where does it come from? Well, at my current job I've had the task of updating a php file based on an xls spreadsheet provided by the client. The info I need to update is contained within a couple php files, so it ends up being a lot of screen switching and comparing numbers. It kinda sucks. So I figured I could write a small script to do this for me.

Files it needs to work:
* dealers.xls file
* dealers.php file
* categories.php file

Dealers.xls looks like this:

|Code|Descriptions|Emails|Cars|
|:--:|:----:|:----:|:----:|
|1 | Blah Dealer| blah@blah.com | Corolla|
|... |...|...|...|

Dealers.php looks like this:
```php
return [
    [
        'dept'            => 'BLAH',
        'dropdownContent' => 'BLAH DEALER',
        'id'              => '676',
        'name'            => 'BLAH DEALER',
        'address'         => [
            'city' => 'BLAH CITY',
        ],
        'email'           => [
            'blah@blah.com',
        ],
        'email_cc'        => [
            'blah@blah.com',
            'blah@blah.com',
        ],
        'models'          => [
            '300000003',
            '310000153',
            '300000000',
            '310000155',
            '300000066',
            '300000106',
            '310000152',
            '300000007',
        ],
    ],
    [...
```

Categories.php looks like this:
```php
300000000 => 
    array (
      'label' => 'Toyota C-HR Hybrid',
      'parent' => 31048,
      'weight' => 100,
      'patterns' => 
      array (
        0 => 'reg:c-hr.*hybrid',
        1 => 'reg:chr.*hybrid',
      ),
    ),
    300000002 => 
    array (...
```