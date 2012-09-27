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
        $postinfo = $postModel->getPost($id);
        if($postinfo){
            header('HTTP/1.1 301 Moved Permanently');
            return $this->redirect()->toUrl('/pages/' . $postinfo['urlName']);
        }
    }

    public function indexAction()
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

        $comments = array();
        if($postinfo){
            $commentsTable = Api::_()->getDbTable('Blog\DbTable\Comments');
            $comments = $commentsTable->where(array("post_id = {$postinfo['id']}"))->find('all');
        }
        $view = new ViewModel(array(
            'post' => $postinfo,
            'comments' => $comments,
        ));
        $view->setTemplate('avnpc/pages/get');
        $this->pagecapture();
        return $view;
    }
}
