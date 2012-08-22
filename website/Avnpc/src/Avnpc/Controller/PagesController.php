<?php
namespace Avnpc\Controller;

use Eva\Api,
    Eva\Mvc\Controller\ActionController,
    Eva\View\Model\ViewModel;

class PagesController extends ActionController
{
    protected $addResources = array(
    );

    public function getAction()
    {
        $id = $this->params('id');
        $postModel = Api::_()->getModel('Blog\Model\Post');
        $postinfo = $postModel->setItemParams($id)->getPost();
        if($postinfo){
            $postinfo['Prev'] = $postModel->getItemTable()->where(array(
                "id < {$postinfo['id']}"
            ))->order('id DESC')->find('one');

            $postinfo['Next'] = $postModel->getItemTable()->where(array(
                "id > {$postinfo['id']}"
            ))->order('id ASC')->find('one');
        }
        $view = new ViewModel(array(
            'post' => $postinfo,
        ));
        $view->setTemplate('avnpc/pages/get');
        return $view;
    }
}
