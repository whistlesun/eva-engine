<?php
namespace Avnpc\Controller;

use Eva\Api,
    Eva\Mvc\Controller\ActionController,
    Zend\View\Model\FeedModel,
    Zend\Feed\Writer\Feed;

class FeedController extends ActionController
{
    public function indexAction()
    {
        $this->getEventManager()->attach('render', function($event){
            $app          = $event->getTarget();
            $locator      = $app->getServiceManager();
            $view         = $locator->get('Zend\View\View');
            $feedStrategy = $locator->get('ViewFeedStrategy');
            $view->getEventManager()->attach($feedStrategy, 100);
        }, 100);

        $request = $this->getRequest();
        $page = $request->getQuery()->get('page', 1);

        $postModel = Api::_()->getModel('Blog\Model\Post');
        $posts = $postModel->setItemListParams(array('page' => $page))->getPosts();
        $paginator = $postModel->getPaginator();


        $view = new FeedModel(array(
            'entries' => $posts,
        ));
        $view->setTemplate('avnpc/feed');
        return $view;
    }
}
