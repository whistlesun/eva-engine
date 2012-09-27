<?php
namespace Avnpc\Controller;

use Eva\Api,
    Eva\Mvc\Controller\ActionController,
    Eva\View\Model\ViewModel;

class IndexController extends ActionController
{
    protected $addResources = array(
    );

    public function indexAction()
    {
        $request = $this->getRequest();
        $page = $request->getQuery()->get('page', 1);

        $postModel = Api::_()->getModel('Blog\Model\Post');
        $posts = $postModel->setItemList(array('page' => $page))->getPostList();
        $paginator = $postModel->getPaginator();

        $view = new ViewModel(array(
            'posts' => $posts,
            'paginator' => $paginator,
        ));
        $view->setTemplate('avnpc/index');
        return $view;
    }
}
