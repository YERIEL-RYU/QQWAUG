import os
import datetime


def set_imagename_format(now, instance, filename):
    """
    image format setting
    e.g)
        {username}-{date}{extension}
    """
    print(os.path.splitext(filename)[1])
    return "{username}-{date}{extension}".format(
        username=instance.userid,
        date=str(now),
        extension=os.path.splitext(filename)[1],
    )


def user_directory_path(instance, filename):
    """
    image upload dircetory setting
    e.g)
        user/img/{username}/{imagename}
        user/img/user4/user4-2020-11-05.jpg
    """
    now = datetime.datetime.now()
    path = "user/img/{username}/{imagename}".format(
        username=instance.userid,
        imagename=set_imagename_format(now, instance, filename)
    )
    return path
