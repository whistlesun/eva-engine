<?php
return array(
    'router' => array(
        'routes' => array(
            'front' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/',
                    'defaults' => array(
                        'controller' => 'Avnpc\Controller\IndexController',
                        'action'     => 'index',
                    ),
                ),
                'priority' => 2,
            ),
            'frontposts' => array(
                'type' => 'Zend\Mvc\Router\Http\Segment',
                'options' => array(
                    'route' => '/pages[/:id]',
                    'constraints' => array(
                        'id'     => '[a-zA-Z][a-zA-Z0-9_-]+',
                    ),
                    'defaults' => array(
                        'controller' => 'Avnpc\Controller\PagesController',
                        'action' => 'get',
                    ),
                ),
                'priority' => 2,
            ),
        ),
    ),
    'controllers' => array(
        'invokables' => array(
            'Avnpc\Controller\IndexController' => 'Avnpc\Controller\IndexController',
            'Avnpc\Controller\PagesController' => 'Avnpc\Controller\PagesController',
        ),
    ),

    'view_manager' => array(
        'template_map' => array(
            'layout/layout' => __DIR__ . '/../layout/avnpc.phtml',
            'avnpc/index' => __DIR__ . '/../view/avnpc/index.phtml',
            'avnpc/pages/get' => __DIR__ . '/../view/avnpc/pages/get.phtml',
            'avnpc/category/get' => __DIR__ . '/../view/avnpc/category/get.phtml',
            'avnpc/order/index' => __DIR__ . '/../view/avnpc/order/index.phtml',
        ),

    ),

    'page_components' => array(
    ),

);
