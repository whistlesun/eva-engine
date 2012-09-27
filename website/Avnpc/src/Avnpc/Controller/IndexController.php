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
        $query = $this->getRequest()->getQuery();
        $form = new \Blog\Form\PostSearchForm();
        $form->bind($query);
        if($form->isValid()){
            $query = $form->getData();
        } else {
            return array(
                'items' => array(),
            );
        }
        $query['status'] = 'published';

        $itemModel = Api::_()->getModel('Blog\Model\Post');
        $items = $itemModel->setItemList($query)->getPostList();
        $paginator = $itemModel->getPaginator();

        $view = new ViewModel(array(
            'items' => $items,
            'paginator' => $paginator,
        ));
        $view->setTemplate('avnpc/index');
        return $view;
    }
}
