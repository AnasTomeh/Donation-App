import { Pressable, SafeAreaView, ScrollView, Text, View, Image, FlatList } from "react-native";
import globalStyle from "../../assets/styles/globalStyle";
import Header from "../../components/Header/Header";
import Search from "../../components/Search/Search";
import { useDispatch, useSelector } from "react-redux";
import style from "./style";
import Tab from "../../components/Tab/Tab";
import { updateSelectedCategoryId } from "../../redux/reducers/Categories";
import { useEffect, useState } from "react";
import donations, { updateSelectedDonationId } from "../../redux/reducers/Donations";
import SingleDonationItem from "../../components/SingleDonationItem/SingleDonationItem";
import { Routes } from "../../navigation/Routes";
import { logOut } from "../../api/user";
import { resetInitialState } from "../../redux/reducers/User";

const Home = ({navigation}) => {

  const [categoryPage, setCategoryPage] = useState(1);
  const [categoryList, setCategoryList] = useState([]);
  const [donationItems, setDonationItems] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  const user = useSelector(state => state.user);
  const categories = useSelector(state => state.categories);
  const donations = useSelector(state => state.donations);

  const dispatch = useDispatch();

  const categoryPageSize = 4;

  useEffect(() => {
    const items = donations.items.filter(value =>
      value.categoryIds.includes(categories.selectedCategoryId),
    );
    setDonationItems(items);
  }, [categories.selectedCategoryId]);

  useEffect(() => {

    setIsLoadingCategories(true);
    setCategoryList(pagination(categories.categories, categoryPage, categoryPageSize))
    setCategoryPage(prev => prev + 1)
    setIsLoadingCategories(false);
  }, [])

  const pagination = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1)* pageSize;
    const endIndex = startIndex + pageSize;

    if(startIndex >= items.length) {
      return [];
    }
    return items.slice(startIndex, endIndex);
  }


  return (
    <SafeAreaView style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.header}>
          <View>
            <Text style={style.headerIntroText}>Hello, </Text>
            <View style={style.username}>
              <Header title={user.displayName + ' 👋'} />
            </View>
          </View>
          <View>
            <Image
              source={{uri: user.profileImage}}
              style={style.profileImage}
              resizeMode={'contain'}
            />
            <Pressable
              onPress={async () => {
                dispatch(resetInitialState());
                await logOut();
              }}>
              <Header type={3} title={'Logout'} color={'#156CF7'} />
            </Pressable>
          </View>
        </View>
        <View style={style.searchBox}>
          <Search />
        </View>
        <Pressable style={style.highlightedImageContainer}>
          <Image
            style={style.highlightedImage}
            source={require('../../assets/images/highlighted_image.png')}
            resizeMode={'contain'}
          />
        </Pressable>
        <View style={style.categoryHeader}>
          <Header title={'Select Category'} type={2} />
        </View>
        <View style={style.categories}>
          <FlatList
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (isLoadingCategories) {
                return;
              }
              // console.log(
              //   'User has reached the end and we are getting more data for page number ',
              //   categoryPage,
              // );
              setIsLoadingCategories(true);
              let newData = pagination(
                categories.categories,
                categoryPage,
                categoryPageSize,
              );
              if (newData.length > 0) {
                setCategoryList(prevState => [...prevState, ...newData]);
                setCategoryPage(prevState => prevState + 1);
              }
              setIsLoadingCategories(false);
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={categoryList}
            renderItem={({item}) => (
              <View style={style.categoryItem} key={item.categoryId}>
                <Tab
                  tabId={item.categoryId}
                  onPress={value => dispatch(updateSelectedCategoryId(value))}
                  title={item.name}
                  isInactive={item.categoryId !== categories.selectedCategoryId}
                />
              </View>
            )}
          />
        </View>
        {donationItems.length > 0 && (
          <View style={style.donationItemsContainer}>
            {donationItems.map(value => {
              const categoryInformation = categories.categories.find(
                val => val.categoryId === categories.selectedCategoryId,
              );
              return (
                <View
                  key={value.donationItemId}
                  style={style.singleDonationItem}>
                  <SingleDonationItem
                    onPress={selectedDonationId => {
                      dispatch(updateSelectedDonationId(selectedDonationId));
                      navigation.navigate(Routes.SingleDonationItem, {
                        categoryInformation,
                      });
                    }}
                    donationItemId={value.donationItemId}
                    uri={value.image}
                    donationTitle={value.name}
                    badgeTitle={categoryInformation.name}
                    price={parseFloat(value.price)}
                  />
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home;
